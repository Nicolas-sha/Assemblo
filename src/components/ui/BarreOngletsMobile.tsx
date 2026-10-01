"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icone, type NomIcone } from "./Icone";
import { ongletDepuisChemin, type OngletNav } from "./BarreNavigationDesktop";

export type BarreOngletsMobileProps = {
  actif?: OngletNav;
};

const ONGLETS: { id: OngletNav; libelle: string; href: string; icone: NomIcone; iconeActive: NomIcone }[] = [
  { id: "accueil", libelle: "Accueil", href: "/", icone: "accueil", iconeActive: "accueil-actif" },
  { id: "catalogue", libelle: "Catalogue", href: "/catalogue", icone: "catalogue", iconeActive: "catalogue-actif" },
  { id: "montages", libelle: "Montages", href: "/montages", icone: "etapes", iconeActive: "etapes-actif" },
];

const classesOnglet = "flex flex-1 flex-col items-center gap-1 pb-6 pt-3 text-legende font-medium";

export function BarreOngletsMobile({ actif }: BarreOngletsMobileProps) {
  const chemin = usePathname();
  const courant = actif ?? ongletDepuisChemin(chemin);
  return (
    <nav aria-label="Navigation principale" className="fixed inset-x-0 bottom-0 z-40 flex h-[84px] border-t border-bordure bg-carte md:hidden">
      {ONGLETS.map((o) => {
        const estActif = courant === o.id;
        return (
          <Link
            key={o.id}
            href={o.href}
            aria-current={estActif ? "page" : undefined}
            className={`${classesOnglet} ${estActif ? "text-action" : "text-texte-2"}`}
          >
            <Icone nom={estActif ? o.iconeActive : o.icone} taille={24} />
            {o.libelle}
          </Link>
        );
      })}
      <Link
        href="/profil"
        aria-current={courant === "profil" ? "page" : undefined}
        className={`${classesOnglet} ${courant === "profil" ? "text-action" : "text-texte-2"}`}
      >
        <Icone nom="profil" taille={24} />
        Profil
      </Link>
    </nav>
  );
}
