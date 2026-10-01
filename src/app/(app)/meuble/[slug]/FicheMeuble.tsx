"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bouton } from "@/components/ui/Bouton";
import { FurnitureImage } from "@/components/ui/FurnitureImage";
import { Modale } from "@/components/ui/Modale";
import { useToast } from "@/components/ui/Toast";
import type { Meuble } from "@/data/meubles";

export function FicheMeuble({ meuble }: { meuble: Meuble }) {
  const [modale, setModale] = useState(false);
  const { afficherToast } = useToast();
  const router = useRouter();
  const chiffres = [
    { valeur: meuble.duree, libelle: "Durée" },
    { valeur: String(meuble.nbEtapes), libelle: "Étapes" },
    { valeur: meuble.difficulte, libelle: "Difficulté" },
  ];

  function commencer() {
    afficherToast("succes", "Montage commencé : votre progression est enregistrée.");
    router.push(`/meuble/${meuble.slug}/verification`);
  }

  return (
    <div className="flex flex-col gap-4 pt-6 md:pt-8">
      <Bouton type="Texte" libelle="← Retour au catalogue" href="/catalogue" className="-ml-6 self-start" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,560px)_minmax(0,560px)] md:gap-12 lg:gap-20">
        <div className="rounded-moyen bg-carte p-4 md:p-6">
          <FurnitureImage
            requete={meuble.requetePexels}
            imageLocale={meuble.image}
            alt={meuble.nom}
            contenir
            className="h-[240px] w-full bg-carte! md:aspect-square md:h-auto"
          />
        </div>
        <div className="flex flex-col gap-6 md:pt-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-titre font-bold text-texte">{meuble.nom}</h1>
            <p className="text-corps text-texte-2">{meuble.reference}</p>
          </div>
          <ul className="grid grid-cols-3 gap-3 md:gap-4">
            {chiffres.map((c) => (
              <li key={c.libelle} className="flex flex-col items-center rounded-moyen border border-bordure bg-carte px-2 py-3 text-center md:px-4">
                <span className="text-corps font-semibold text-texte md:text-sous-titre">{c.valeur}</span>
                <span className="text-legende font-medium text-texte-2">{c.libelle}</span>
              </li>
            ))}
          </ul>
          <p className="text-corps text-texte">Outils nécessaires : {meuble.outils}.</p>
          <p className="text-corps text-texte-2">
            Dans le carton : {meuble.piecesResume}. Vous les vérifierez à l&apos;étape suivante.
          </p>
          <Bouton libelle="Commencer le montage" onClick={() => setModale(true)} className="w-full md:w-auto md:self-start" />
        </div>
      </div>
      <Modale
        ouverte={modale}
        titre="Commencer le montage ?"
        onFermer={() => setModale(false)}
        secondaire={{ libelle: "Plus tard" }}
        primaire={{ libelle: "Commencer", onClick: commencer }}
      >
        {meuble.nbEtapes} étapes, environ {meuble.duree.replace("≈ ", "")}. Gardez vos pièces et un tournevis cruciforme à portée de main.
      </Modale>
    </div>
  );
}
