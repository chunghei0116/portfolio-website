import type { PrincipleItem } from '@/types/portfolio';

interface Props {
  readonly items: readonly PrincipleItem[];
}

export default function PrinciplesSection({ items }: Props) {
  return (
    <section className="section-block principles-section" aria-labelledby="principles-title">
      <div className="section-heading principles-heading">
        <h2 id="principles-title">Working principles.</h2>
        <p>Simple checks that keep the output useful after the handoff.</p>
      </div>

      <ol className="principles-list">
        {items.map((item, index) => (
          <li key={item.title}>
            <span className="principle-index">0{index + 1}</span>
            <article>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
