"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { Bouton } from "./Bouton";
import { Icone } from "./Icone";

export type ActionModale = { libelle: string; onClick?: () => void };

export type ModaleProps = {
  ouverte: boolean;
  titre: string;
  onFermer: () => void;
  children?: ReactNode;
  /** Bouton secondaire (ferme la modale en plus de son onClick). */
  secondaire?: ActionModale;
  primaire?: ActionModale;
};

const FOCUSABLES = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

export function Modale({ ouverte, titre, onFermer, children, secondaire, primaire }: ModaleProps) {
  const titreId = useId();
  const boite = useRef<HTMLDivElement>(null);
  const onFermerRef = useRef(onFermer);
  useEffect(() => {
    onFermerRef.current = onFermer;
  });

  useEffect(() => {
    if (!ouverte) return;
    const precedent = document.activeElement as HTMLElement | null;
    boite.current?.querySelector<HTMLElement>(FOCUSABLES)?.focus();
    const surTouche = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onFermerRef.current();
        return;
      }
      if (e.key !== "Tab" || !boite.current) return;
      const els = Array.from(boite.current.querySelectorAll<HTMLElement>(FOCUSABLES));
      if (els.length === 0) return;
      const premier = els[0];
      const dernier = els[els.length - 1];
      if (e.shiftKey && document.activeElement === premier) {
        e.preventDefault();
        dernier.focus();
      } else if (!e.shiftKey && document.activeElement === dernier) {
        e.preventDefault();
        premier.focus();
      }
    };
    document.addEventListener("keydown", surTouche);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", surTouche);
      document.body.style.overflow = overflow;
      precedent?.focus();
    };
  }, [ouverte]);

  if (!ouverte) return null;
  return (
    <div
      className="fixed inset-0 z-[90] flex animate-fondu items-end justify-center bg-texte/40 md:items-center md:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onFermer();
      }}
    >
      <div
        ref={boite}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titreId}
        className="flex w-full animate-feuille flex-col gap-4 rounded-t-grand bg-carte p-6 shadow-elev-3 md:w-[480px] md:animate-fondu-zoom md:rounded-grand"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titreId} className="text-sous-titre font-semibold text-texte">
            {titre}
          </h2>
          <button
            type="button"
            onClick={onFermer}
            aria-label="Fermer"
            className="-mr-2 -mt-2 flex size-11 shrink-0 items-center justify-center rounded-petit hover:bg-fond focus-visible:outline-2 focus-visible:outline-action"
          >
            <Icone nom="fermer" taille={22} />
          </button>
        </div>
        <div className="text-corps text-texte-2">{children}</div>
        {secondaire || primaire ? (
          <div className="flex justify-end gap-3">
            {secondaire ? (
              <Bouton
                type="Secondaire"
                libelle={secondaire.libelle}
                onClick={() => {
                  secondaire.onClick?.();
                  onFermer();
                }}
              />
            ) : null}
            {primaire ? <Bouton libelle={primaire.libelle} onClick={primaire.onClick} /> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
