import { ArrowDown, ArrowUpRight } from 'lucide-react';
import HikingStickHero from '@/app/hiking-stick-hero';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow">Mobile developer and DevOps engineer in Hong Kong</p>
          <h1 id="hero-title">Mobile products, engineered to keep moving.</h1>
          <p className="hero-lede">
            I build refined Flutter experiences and the delivery systems that keep every release dependable.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              View work <ArrowDown aria-hidden="true" size={17} />
            </a>
            <a className="button button-secondary" href="#contact">
              Contact <ArrowUpRight aria-hidden="true" size={17} />
            </a>
          </div>
          <ul className="hero-proof" aria-label="Core practice areas">
            <li>Flutter</li>
            <li>Delivery systems</li>
            <li>Cloud operations</li>
          </ul>
        </div>

        <div className="hero-artifact" aria-hidden="true">
          <HikingStickHero />
        </div>
      </div>
    </section>
  );
}
