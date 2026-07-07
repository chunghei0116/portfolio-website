import { NextResponse } from "next/server";

// Cache duration: 1 hour (3600 seconds)
export const revalidate = 3600;

interface Day {
  color: string;
  contributionCount: number;
  date: string;
}

export async function GET() {
  const username = "chunghei0116";
  const token = process.env.GITHUB_TOKEN;

  // Private company GitHub contributions (2023 - 2026)
  // 2023: 120, 2024: 1567, 2025: 1201, 2026: 1411
  const companyContributions = 120 + 1567 + 1201 + 1411; // 4299

  // 1. Try official GitHub GraphQL API if token is provided
  if (token) {
    try {
      const query = `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    color
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `;

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "Portfolio-Website",
        },
        body: JSON.stringify({
          query,
          variables: { username },
        }),
        next: { revalidate: 3600 }
      });

      if (response.ok) {
        const data = await response.json();
        const calendarData = data?.data?.user?.contributionsCollection?.contributionCalendar;
        if (calendarData) {
          const count = calendarData.totalContributions;
          const rawWeeks = calendarData.weeks || [];
          
          // Map GraphQL format to standardized days structure
          const contributions = rawWeeks.map((w: any) => 
            (w.contributionDays || []).map((d: any) => ({
              color: d.color,
              contributionCount: d.contributionCount,
              date: d.date,
            }))
          );

          return NextResponse.json({
            count: count + companyContributions,
            contributions,
            source: "graphql"
          });
        }
      }
    } catch (error) {
      console.error("GitHub GraphQL API error:", error);
    }
  }

  // 2. Fallback: Try unofficial public scraper API
  try {
    const response = await fetch(`https://github-contributions-api.deno.dev/${username}.json`, {
      next: { revalidate: 3600 }
    });
    if (response.ok) {
      const data = await response.json();
      const count = data?.totalContributions;
      const contributions = data?.contributions;
      if (typeof count === "number" && Array.isArray(contributions)) {
        return NextResponse.json({ 
          count: count + companyContributions, 
          contributions, 
          source: "scraper" 
        });
      }
    }
  } catch (error) {
    console.error("GitHub Scraper API error:", error);
  }

  // 3. Fallback: Try public REST API for commits count (returns no calendar)
  try {
    const response = await fetch(`https://api.github.com/search/commits?q=author:${username}`, {
      headers: {
        "User-Agent": "Portfolio-Website",
        Accept: "application/vnd.github.cloak-preview"
      },
      next: { revalidate: 3600 }
    });
    if (response.ok) {
      const data = await response.json();
      const count = data?.total_count;
      if (typeof count === "number") {
        return NextResponse.json({ 
          count: count + companyContributions, 
          contributions: [], 
          source: "search_api" 
        });
      }
    }
  } catch (error) {
    console.error("GitHub Search API error:", error);
  }

  // 4. Final static fallback (public static: 353 + company: 4299)
  return NextResponse.json({ 
    count: 353 + companyContributions, 
    contributions: [], 
    source: "fallback" 
  });
}
