# GitHub Contribution Calculation Method

This document outlines how the total GitHub contribution count displayed on the portfolio website is calculated and fetched.

## Calculation Formula

The total contribution count is calculated as:

$$\text{Total Contributions} = \text{Public GitHub Contributions} + \text{Private Company Contributions}$$

### 1. Private Company Contributions
Contributions made within private corporate repositories (not accessible via public GitHub APIs) are hardcoded based on yearly telemetry data:

*   **2023:** 120 contributions
*   **2024:** 1,567 contributions
*   **2025:** 1,201 contributions
*   **2026:** 1,411 contributions
*   **Total Private Contributions:** **4,299**

### 2. Public GitHub Contributions
The website attempts to fetch public contributions for username `chunghei0116` using a tiered fetching strategy.

---

## Tiered Fetching Strategy (Data Sources)

The server route ([route.ts](file:///Users/jones.tse/development/personal/portfolio-website/src/app/api/github/route.ts)) executes the following steps in order, returning the first successful result:

### Tier 1: GitHub GraphQL API (Official)
*   **Condition:** Activated if `GITHUB_TOKEN` is present in the environment variables.
*   **Method:** POST request to `https://api.github.com/graphql` querying the `contributionCalendar`.
*   **Output:** Returns accurate total contributions and the full 52-week contribution grid data.

### Tier 2: Public Scraper API (Fallback)
*   **Condition:** Used if the GraphQL API fails or no token is provided.
*   **Method:** GET request to `https://github-contributions-api.deno.dev/chunghei0116.json`.
*   **Output:** Returns total contributions and the 52-week grid data scraped from the public profile.

### Tier 3: GitHub REST Search API (Fallback)
*   **Condition:** Used if the scraper API is offline/fails.
*   **Method:** GET request to `https://api.github.com/search/commits?q=author:chunghei0116`.
*   **Output:** Returns the count of public commits, but does not provide grid calendar data.

### Tier 4: Static Fallback
*   **Condition:** Standard fallback if all API calls fail or rate limits are reached.
*   **Static Public Value:** 353 contributions.
*   **Output:** Total contributions default to $353 + 4,299 = 4,652$.

---

## Caching
All successful API responses are cached on the server for **1 hour (3600 seconds)** using Next.js route revalidation (`export const revalidate = 3600`) to respect GitHub rate limits.
