"use client";

import { useState } from "react";
import { Champ } from "@/components/ui/Champ";
import { CarteMeuble } from "@/components/ui/CarteMeuble";
import { meublesRecents } from "@/data/meubles";

export function Accueil() {
  const [recherche, setRecherche] = useState("");
  const q = recherche.trim().toLowerCase();
  const liste = meublesRecents.filter((m) => `${m.nom} ${m.reference}`.toLowerCase().includes(q));

  return (
    <div className="flex flex-col gap-2 pt-8 md:pt-12">
      <h1 className="text-titre font-bold text-texte">Bonjour Léa</h1>
      <p className="text-corps text-texte-2">Quel meuble allez-vous monter aujourd&apos;hui ?</p>
      <Champ
        etiquette="Rechercher"
        type="search"
        placeholder="Rechercher un meuble ou une référence"
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
        className="mt-4 w-full md:w-[720px]"
      />
      <h2 className="mt-8 text-sous-titre font-semibold text-texte">Récemment consultés</h2>
      {liste.length > 0 ? (
        <ul className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {liste.map((m) => (
            <li key={m.slug} className="flex">
              <CarteMeuble meuble={m} href={`/meuble/${m.slug}`} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-corps text-texte-2">Aucun meuble ne correspond à « {recherche} ».</p>
      )}
    </div>
  );
}
