"use client";

import { useEffect, useState } from "react";

export type FurnitureImageProps = {
  /** Requête de recherche Pexels (ex. « wooden chest of drawers »). */
  requete: string;
  alt: string;
  /** Chemin public de l'image locale de secours. */
  imageLocale?: string;
  /** true : l'image est contenue (fiche), sinon recadrée (object-cover). */
  contenir?: boolean;
  className?: string;
};

// Cache mémoire client : une seule requête par recherche.
const cache = new Map<string, Promise<string | null>>();
const resolus = new Map<string, string | null>();

function chercher(requete: string): Promise<string | null> {
  let p = cache.get(requete);
  if (!p) {
    p = fetch(`/api/pexels?q=${encodeURIComponent(requete)}`)
      .then((r) => (r.ok ? (r.json() as Promise<{ url: string | null }>) : { url: null }))
      .then((d) => d.url ?? null)
      .catch(() => null)
      .then((url) => {
        resolus.set(requete, url);
        return url;
      });
    cache.set(requete, p);
  }
  return p;
}

function Placeholder() {
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full" role="img" aria-label="Illustration de meuble" preserveAspectRatio="xMidYMid meet">
      <rect width="200" height="150" className="fill-image" />
      <g className="stroke-texte-2" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="50" y="42" width="100" height="66" rx="4" />
        <path d="M50 64h100M50 86h100" />
        <path d="M92 53h16M92 75h16M92 97h16" />
        <path d="M58 108v10M142 108v10" />
      </g>
    </svg>
  );
}

export function FurnitureImage({ requete, alt, imageLocale, contenir = false, className = "" }: FurnitureImageProps) {
  const [attente, setAttente] = useState<{ requete: string; url: string | null } | null>(null);
  const [distantKo, setDistantKo] = useState(false);
  const [localeKo, setLocaleKo] = useState(false);

  useEffect(() => {
    let actif = true;
    chercher(requete).then((url) => {
      if (actif) setAttente({ requete, url });
    });
    return () => {
      actif = false;
    };
  }, [requete]);

  const resolu = resolus.has(requete) ? resolus.get(requete)! : attente?.requete === requete ? attente.url : undefined;
  const ajustement = contenir ? "object-contain" : "object-cover";
  const conteneur = `relative overflow-hidden bg-image ${className}`;

  if (resolu === undefined) {
    return <div className={conteneur} aria-busy="true" />;
  }
  const distant = resolu && !distantKo ? resolu : null;
  // L'image locale (celle du Figma) prime sur Pexels.
  const locale = imageLocale && !localeKo ? imageLocale : null;
  const src = locale ?? distant;
  return (
    <div className={conteneur}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={`h-full w-full ${ajustement}`}
          onError={() => (locale ? setLocaleKo(true) : setDistantKo(true))}
        />
      ) : (
        <Placeholder />
      )}
    </div>
  );
}
