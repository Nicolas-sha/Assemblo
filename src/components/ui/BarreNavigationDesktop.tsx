"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icone } from "./Icone";

export type OngletNav = "accueil" | "catalogue" | "montages";

export type BarreNavigationDesktopProps = {
  /** Force l'onglet actif (sinon déduit de l'URL). */
  actif?: OngletNav;
  prenom?: string;
};

const LIENS: { id: OngletNav; libelle: string; href: string }[] = [
  { id: "accueil", libelle: "Accueil", href: "/" },
  { id: "catalogue", libelle: "Catalogue", href: "/catalogue" },
  { id: "montages", libelle: "Montages", href: "/montages" },
];

/** Onglet actif déduit de l'URL ; le parcours de montage (étapes…) relève de « Montages ». */
export function ongletDepuisChemin(chemin: string): OngletNav | null {
  if (chemin === "/") return "accueil";
  if (chemin.startsWith("/catalogue")) return "catalogue";
  if (chemin.startsWith("/montages")) return "montages";
  if (/^\/meuble\/[^/]+\/merci/.test(chemin)) return "accueil";
  if (/^\/meuble\/[^/]+\/(verification|etape|fin)/.test(chemin)) return "montages";
  if (chemin.startsWith("/meuble")) return "catalogue";
  return null;
}

export function BarreNavigationDesktop({ actif, prenom = "Léa" }: BarreNavigationDesktopProps) {
  const chemin = usePathname();
  const courant = actif ?? ongletDepuisChemin(chemin);
  return (
    <header className="hidden h-[72px] border-b border-bordure bg-carte md:block">
      <div className="mx-auto flex h-full max-w-[1440px] items-center px-6 lg:px-[120px]">
        <Link href="/" className="flex items-center gap-3 text-sous-titre font-semibold text-texte">
          <Icone nom="logo" taille={40} />
          Assemblo
        </Link>
        <nav aria-label="Navigation principale" className="ml-12 flex h-full gap-[45px] lg:ml-[75px]">
          {LIENS.map((l) => {
            const estActif = courant === l.id;
            return (
              <Link
                key={l.id}
                href={l.href}
                aria-current={estActif ? "page" : undefined}
                className={`flex h-full items-center border-b-[3px] text-corps focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-action ${
                  estActif ? "border-action font-semibold text-action" : "border-transparent text-texte"
                }`}
              >
                {l.libelle}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Icone nom="avatar" taille={36} />
          <span className="text-corps font-semibold text-texte">{prenom}</span>
        </div>
      </div>
    </header>
  );
}
