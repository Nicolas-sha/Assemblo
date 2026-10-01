"use client";

import { useState } from "react";
import { EnteteCatalogue } from "@/components/EnteteCatalogue";
import { Bouton } from "@/components/ui/Bouton";
import { Icone } from "@/components/ui/Icone";
import { useToast } from "@/components/ui/Toast";
import { meubleSansGuide } from "@/data/meubles";

export function SansGuide() {
  const [recherche, setRecherche] = useState("commode lingère 000.000.99");
  const { afficherToast } = useToast();

  return (
    <div>
      <EnteteCatalogue recherche={recherche} onRecherche={setRecherche} afficherSimuler={false} />
      <section className="mx-auto mt-12 flex max-w-[600px] flex-col items-center gap-4 text-center md:mt-16">
        <div className="flex size-16 items-center justify-center rounded-full bg-action-teinte">
          <Icone nom="info" taille={32} />
        </div>
        <h2 className="text-sous-titre font-semibold text-texte">
          La {meubleSansGuide.nom.replace("La ", "")} (Réf. {meubleSansGuide.reference.replace("Réf. ", "")}) n&apos;a pas encore de guide.
        </h2>
        <p className="text-corps text-texte-2">Nous ajoutons de nouveaux meubles chaque semaine : votre demande est prioritaire.</p>
        <div className="mt-4 flex w-full flex-col gap-3 md:w-auto md:flex-row md:gap-4">
          <Bouton
            libelle="Demander ce guide"
            onClick={() => afficherToast("info", "Demande envoyée : nous vous prévenons dès que le guide est prêt.")}
          />
          <Bouton type="Secondaire" libelle="Retour au catalogue" href="/catalogue" />
        </div>
      </section>
    </div>
  );
}
