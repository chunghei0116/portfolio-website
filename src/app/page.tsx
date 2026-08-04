import CapabilitiesSection from '@/components/portfolio/capabilities-section';
import ContactFooter from '@/components/portfolio/contact-footer';
import ExperienceSection from '@/components/portfolio/experience-section';
import Hero from '@/components/portfolio/hero';
import OperatingModel from '@/components/portfolio/operating-model';
import PrinciplesSection from '@/components/portfolio/principles-section';
import SiteNav from '@/components/portfolio/site-nav';
import { portfolioContent } from '@/content/portfolio';
import { getSiteUrl } from '@/lib/site-url';

type JsonLd = Record<string, unknown>;

export default function Home() {
  const siteUrl = getSiteUrl();
  const person: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jones Tse',
    jobTitle: ['Mobile Application Developer', 'DevOps Engineer'],
    homeLocation: {
      '@type': 'Place',
      name: 'Hong Kong',
    },
    sameAs: ['https://github.com/chunghei0116'],
    ...(siteUrl ? { url: siteUrl.href } : {}),
  };
  const website: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Jones Tse',
    ...(siteUrl ? { url: siteUrl.href } : {}),
  };

  return (
    <>
      <SiteNav />
      <main id="main-content">
        <Hero />
        <ExperienceSection items={portfolioContent.experience} />
        <CapabilitiesSection items={portfolioContent.capabilities} />
        <OperatingModel items={portfolioContent.practices} />
        <PrinciplesSection items={portfolioContent.principles} />
        <ContactFooter />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([person, website]).replace(/</g, '\\u003c'),
        }}
      />
    </>
  );
}
