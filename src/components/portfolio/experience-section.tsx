import Image from 'next/image';
import type { ExperienceItem } from '@/types/portfolio';
import ExperienceDetails from './experience-details';

interface Props {
  readonly items: readonly ExperienceItem[];
}

export default function ExperienceSection({ items }: Props) {
  return (
    <section className="section-block experience-section" id="work" aria-labelledby="work-title">
      <div className="section-heading experience-heading">
        <h2 id="work-title">Selected experience</h2>
        <p>
          Mobile product craft and infrastructure practice, connected by a focus on dependable
          releases.
        </p>
      </div>

      <div className="experience-list">
        {items.map((item) => (
          <article className="experience-entry" key={item.company}>
            <div className="experience-media">
              <Image
                src={item.image}
                alt={item.imageAlt}
                width={item.company === 'AS Watson Group' ? 1024 : 1536}
                height={item.company === 'AS Watson Group' ? 1024 : 1024}
                sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 42vw"
              />
            </div>

            <div className="experience-entry-body">
              <div className="experience-meta">
                <span>{item.period}</span>
                <span>{item.location}</span>
              </div>
              <h3>{item.company}</h3>
              <p className="experience-role">{item.role}</p>
              <p className="experience-summary">{item.summary}</p>

              <ul className="tag-list" aria-label={`${item.company} technologies`}>
                {item.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>

              <ExperienceDetails achievements={item.achievements} company={item.company} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
