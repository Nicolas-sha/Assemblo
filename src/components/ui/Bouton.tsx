import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export type TypeBouton = "Primaire" | "Secondaire" | "Texte" | "Danger";

export type BoutonProps = Omit<ComponentProps<"button">, "type" | "children"> & {
  type?: TypeBouton;
  libelle?: ReactNode;
  children?: ReactNode;
  /** Type HTML du <button> (défaut « button »). */
  htmlType?: "button" | "submit" | "reset";
  /** Si fourni, rend un lien <a> stylé comme un bouton. */
  href?: string;
  pleineLargeur?: boolean;
};

const BASE =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-moyen px-6 py-3 text-corps font-bold leading-5 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action disabled:cursor-not-allowed";

const VARIANTES: Record<TypeBouton, string> = {
  Primaire:
    "bg-action text-texte-inverse hover:bg-action-survol disabled:bg-desactive disabled:text-texte-desactive disabled:hover:bg-desactive",
  Secondaire:
    "bg-carte text-action border-[1.5px] border-action hover:bg-action-teinte disabled:border-desactive disabled:text-texte-desactive disabled:hover:bg-carte",
  Texte: "bg-transparent text-action hover:bg-action-teinte disabled:text-texte-desactive disabled:hover:bg-transparent",
  Danger: "bg-erreur text-texte-inverse hover:bg-erreur disabled:bg-desactive disabled:text-texte-desactive",
};

export function Bouton({ type = "Primaire", libelle, children, htmlType = "button", href, pleineLargeur = false, className = "", ...reste }: BoutonProps) {
  const classes = `${BASE} ${VARIANTES[type]} ${pleineLargeur ? "w-full" : ""} ${className}`;
  const contenu = libelle ?? children;
  if (href && !reste.disabled) {
    return (
      <Link href={href} className={classes} onClick={reste.onClick as never} aria-label={reste["aria-label"]}>
        {contenu}
      </Link>
    );
  }
  return (
    <button type={htmlType} className={classes} {...reste}>
      {contenu}
    </button>
  );
}
