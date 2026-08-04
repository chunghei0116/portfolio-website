'use client';

import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';
import type { PracticeItem } from '@/types/portfolio';

interface Props {
  readonly items: readonly PracticeItem[];
}

export default function OperatingModel({ items }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const idPrefix = useId().replaceAll(':', '');

  return (
    <section className="section-block operating-section" id="practice" aria-labelledby="practice-title">
      <div className="section-heading operating-heading">
        <h2 id="practice-title">Build. Ship. Operate.</h2>
        <p>One working rhythm from the first interface decision to the operational feedback loop.</p>
      </div>

      <div className="practice-list">
        {items.map((item, index) => {
          const isOpen = activeIndex === index;
          const detailId = `${idPrefix}-practice-detail-${index}`;

          return (
            <article className={`practice-row ${isOpen ? 'is-open' : ''}`} key={item.title}>
              <div className="practice-row-main">
                <span className="practice-index">0{index + 1}</span>
                <button
                  className="practice-toggle"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={detailId}
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                >
                  <span>{item.title}</span>
                  <ChevronDown aria-hidden="true" size={19} />
                </button>
              </div>
              <p className="practice-summary">{item.summary}</p>
              <div id={detailId} className="practice-detail" hidden={!isOpen}>
                <p>{item.detail}</p>
                <p className="practice-tools">{item.tools.join(', ')}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
