import type { CSSProperties } from "react";

export type NomIcone =
  | "accueil" | "accueil-actif" | "alerte" | "avatar" | "catalogue" | "catalogue-actif"
  | "coche-blanche" | "coche-grande" | "coche-succes" | "duree" | "etapes" | "etapes-actif"
  | "fermer" | "info" | "logo" | "note-4-sur-5" | "profil"
  | "cheville-en-bois" | "coulisse-de-tiroir" | "facade-de-tiroir" | "panneau-lateral" | "plateau" | "vis";

const PIECES: readonly string[] = ["cheville-en-bois", "coulisse-de-tiroir", "facade-de-tiroir", "panneau-lateral", "plateau", "vis"];

export type IconeProps = {
  nom: NomIcone;
  /** Taille en px (carré). Défaut 24. */
  taille?: number;
  /** true : l'icône prend la couleur du texte (currentColor) via mask-image. */
  colore?: boolean;
  /** Texte alternatif ; vide = décorative. */
  alt?: string;
  className?: string;
};

export function cheminIcone(nom: NomIcone): string {
  return `/${PIECES.includes(nom) ? "pieces" : "icons"}/${nom}.svg`;
}

export function Icone({ nom, taille = 24, colore = false, alt = "", className = "" }: IconeProps) {
  const src = cheminIcone(nom);
  const a11y = alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true };
  if (colore) {
    const style: CSSProperties = {
      width: taille,
      height: taille,
      maskImage: `url(${src})`,
      WebkitMaskImage: `url(${src})`,
      maskSize: "contain",
      WebkitMaskSize: "contain",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskPosition: "center",
      WebkitMaskPosition: "center",
    };
    return <span {...a11y} style={style} className={`inline-block shrink-0 bg-current ${className}`} />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={taille} height={taille} className={`shrink-0 ${className}`} />
  );
}
