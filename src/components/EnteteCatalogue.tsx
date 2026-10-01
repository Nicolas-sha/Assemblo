"use client";

import { useRouter } from "next/navigation";
import { Bouton } from "@/components/ui/Bouton";
import { Champ } from "@/components/ui/Champ";

type Props = { recherche: string; onRecherche: (valeur: string) => void; afficherSimuler?: boolean };

// En-tête commun /catalogue et /catalogue/sans-guide.
export function EnteteCatalogue({ recherche, onRecherche, afficherSimuler = true }: Props) {
  const router = useRouter();
  return (
    <header className="flex flex-col gap-2 pt-8 md:pt-12">
      <h1 className="text-titre font-bold text-texte">Quel meuble allez-vous monter ?</h1>
      <p className="text-corps text-texte-2">Choisissez votre meuble : le guide s&apos;adapte à sa référence.</p>
      <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:gap-6">
        <Champ
          etiquette="Recherche"
          type="search"
          placeholder="Rechercher un meuble ou une référence"
          value={recherche}
          onChange={(e) => onRecherche(e.target.value)}
          className="w-full md:w-[560px]"
        />
        {afficherSimuler ? (
          <Bouton type="Texte" libelle="Simuler : meuble sans guide" onClick={() => router.push("/catalogue/sans-guide")} pleineLargeur className="md:ml-auto md:w-auto" />
        ) : null}
      </div>
    </header>
  );
}
