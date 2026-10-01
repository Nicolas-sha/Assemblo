"use client";

import { useState } from "react";
import { EnteteCatalogue } from "@/components/EnteteCatalogue";
import { CarteMeuble } from "@/components/ui/CarteMeuble";
import { meublesCatalogue } from "@/data/meubles";

export function Catalogue() {
  const [recherche, setRecherche] = useState("");
  const q = recherche.trim().toLowerCase();
  const liste = meublesCatalogue.filter((m) => `${m.nom} ${m.reference}`.toLowerCase().includes(q));
  const n = liste.length;

  return (
    <div>
      <EnteteCatalogue recherche={recherche} onRecherche={setRecherche} />
      <h2 className="sticky top-0 z-10 -mx-6 mt-4 bg-fond px-6 py-3 text-corps font-semibold text-texte-2 md:static md:mx-0 md:mt-6 md:px-0 md:py-0 md:text-sous-titre md:text-texte">
        {n} {n > 1 ? "meubles" : "meuble"} · Chambre
      </h2>
      {n > 0 ? (
        <ul className="mt-2 grid grid-cols-1 gap-6 md:mt-4 md:grid-cols-2 lg:grid-cols-3">
          {liste.map((m) => (
            <li key={m.slug} className="flex">
              <CarteMeuble meuble={m} href={`/meuble/${m.slug}`} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-corps text-texte-2" role="status">
          Aucun meuble ne correspond à « {recherche} ».
        </p>
      )}
    </div>
  );
}
