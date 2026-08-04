import { ArrowUpRight } from 'lucide-react';

export default function ContactFooter() {
  return (
    <>
      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="contact-inner">
          <h2 id="contact-title">Let&apos;s make the next release feel effortless.</h2>
          <a
            className="contact-link"
            href="https://github.com/chunghei0116"
            target="_blank"
            rel="noreferrer"
          >
            Open GitHub profile <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <p>Jones Tse</p>
        <p>Hong Kong</p>
        <p>Mobile development and DevOps engineering</p>
        <a href="#top">Back to top</a>
      </footer>
    </>
  );
}
