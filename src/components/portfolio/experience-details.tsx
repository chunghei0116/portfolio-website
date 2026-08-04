'use client';

import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';

interface Props {
  readonly achievements: readonly string[];
  readonly company: string;
}

export default function ExperienceDetails({ achievements, company }: Props) {
  const [open, setOpen] = useState(false);
  const regionId = useId();

  return (
    <div className="experience-details">
      <button
        className="text-button"
        type="button"
        aria-expanded={open}
        aria-controls={regionId}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{open ? 'Hide contribution details' : 'Read contribution details'}</span>
        <ChevronDown aria-hidden="true" size={17} />
      </button>
      <div id={regionId} className="experience-detail-region" hidden={!open}>
        <h4 className="sr-only">Contributions at {company}</h4>
        <ul>
          {achievements.map((achievement) => (
            <li key={achievement}>{achievement}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
