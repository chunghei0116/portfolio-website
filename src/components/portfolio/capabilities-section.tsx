import type { CapabilityItem } from '@/types/portfolio';

interface Props {
  readonly items: readonly CapabilityItem[];
}

export default function CapabilitiesSection({ items }: Props) {
  return (
    <section className="section-block capabilities-section" aria-labelledby="capabilities-title">
      <div className="section-heading capabilities-heading">
        <h2 id="capabilities-title">Capabilities that hold the whole release together.</h2>
        <p>
          A practical range for building the product, making the release repeatable, and keeping
          the platform legible in production.
        </p>
      </div>

      <ol className="capability-list">
        {items.map((item) => (
          <li className="capability-item" key={item.index}>
            <span className="capability-index">{item.index}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <p className="capability-tools">{item.tools.join(', ')}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
