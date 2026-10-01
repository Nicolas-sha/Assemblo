"use client";

import { useState } from "react";

export type NoteProps = {
  /** 0 à 5 */
  valeur: number;
  onChange?: (valeur: number) => void;
  lectureSeule?: boolean;
  className?: string;
};

function Etoile({ pleine }: { pleine: boolean }) {
  return (
    <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true" className={`transition-colors duration-150 ${pleine ? "text-etoile" : "text-etoile-vide"}`}>
      <path
        fill="currentColor"
        d="M20 0L25.2901 12.7188L39.0211 13.8197L28.5595 22.7812L31.7557 36.1803L20 29L8.2443 36.1803L11.4405 22.7812L0.97887 13.8197L14.7099 12.7188L20 0Z"
      />
    </svg>
  );
}

export function Note({ valeur, onChange, lectureSeule = false, className = "" }: NoteProps) {
  const [survol, setSurvol] = useState<number | null>(null);
  const affichee = survol ?? valeur;
  return (
    <div role="radiogroup" aria-label="Note sur 5" className={`flex gap-2 ${className}`} onMouseLeave={() => setSurvol(null)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={valeur === n}
          aria-label={`${n} sur 5`}
          disabled={lectureSeule}
          onClick={() => onChange?.(n)}
          onMouseEnter={() => !lectureSeule && setSurvol(n)}
          onFocus={() => !lectureSeule && setSurvol(n)}
          onBlur={() => setSurvol(null)}
          className="rounded-petit p-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action enabled:cursor-pointer"
        >
          <Etoile pleine={n <= affichee} />
        </button>
      ))}
    </div>
  );
}
