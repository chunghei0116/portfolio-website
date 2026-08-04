import { ArrowUpRight } from 'lucide-react';
import MobileMenu from './mobile-menu';

export default function SiteNav() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-nav" id="top">
        <a className="wordmark" href="#top" aria-label="Jones Tse, return home">
          Jones Tse
        </a>

        <nav className="desktop-navigation" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#practice">Practice</a>
          <a href="#contact">Contact</a>
        </nav>

        <a
          className="nav-external"
          href="https://github.com/chunghei0116"
          target="_blank"
          rel="noreferrer"
        >
          GitHub <ArrowUpRight aria-hidden="true" size={16} />
        </a>

        <MobileMenu />
      </header>
    </>
  );
}
