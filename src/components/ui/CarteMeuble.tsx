import Link from "next/link";
import type { Meuble } from "@/data/meubles";
import { FurnitureImage } from "./FurnitureImage";
import { Icone } from "./Icone";

export type CarteMeubleProps = {
  meuble: Pick<Meuble, "nom" | "reference" | "duree" | "nbEtapes" | "requetePexels" | "image">;
  etat?: "Defaut" | "Selectionne";
  /** Lien de destination (par défaut la carte est un bouton si onClick). */
  href?: string;
  onClick?: () => void;
  className?: string;
};

export function CarteMeuble({ meuble, etat = "Defaut", href, onClick, className = "" }: CarteMeubleProps) {
  const choisi = etat === "Selectionne";
  const classes = `group flex w-full flex-col gap-2 rounded-grand p-4 text-left shadow-elev-1 transition duration-150 hover:-translate-y-0.5 hover:shadow-elev-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action md:max-w-[360px] ${
    choisi ? "border-2 border-action bg-action-teinte" : "border border-bordure bg-carte"
  } ${className}`;
  const contenu = (
    <>
      <FurnitureImage requete={meuble.requetePexels} imageLocale={meuble.image} alt={meuble.nom} className="h-[150px] w-full rounded-moyen" />
      <span className="text-corps font-semibold text-texte">{meuble.nom}</span>
      <span className="text-legende font-medium text-texte-2">{meuble.reference}</span>
      <span className="flex items-center gap-2 text-legende font-medium text-action">
        <Icone nom="duree" taille={16} />
        {meuble.duree} · {meuble.nbEtapes} étapes
      </span>
      {choisi ? <span className="text-legende font-medium text-action">✓ Choisi</span> : null}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={classes} aria-current={choisi ? "true" : undefined}>
        {contenu}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes} aria-pressed={choisi}>
      {contenu}
    </button>
  );
}
