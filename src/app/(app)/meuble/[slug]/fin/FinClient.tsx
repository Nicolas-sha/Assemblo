"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bouton } from "@/components/ui/Bouton";
import { Champ } from "@/components/ui/Champ";
import { Icone } from "@/components/ui/Icone";
import { Note } from "@/components/ui/Note";
import { useAppState } from "@/lib/app-state";

export function FinClient({ slug, nomMeuble }: { slug: string; nomMeuble: string }) {
  const router = useRouter();
  const { enregistrerAvis, terminerMontage } = useAppState();
  const [note, setNote] = useState(4);
  const [commentaire, setCommentaire] = useState("");

  // « commode » (féminin → montée), « bureau » (masculin → monté)
  const mot = nomMeuble.split(" ")[0].toLowerCase();
  const accord = mot.endsWith("e") ? "montée" : "monté";

  function envoyer() {
    enregistrerAvis(slug, { note, commentaire: commentaire.trim() });
    terminerMontage(slug);
    router.push(`/meuble/${slug}/merci`);
  }
  function passer() {
    terminerMontage(slug);
    router.push("/");
  }

  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col items-center gap-6 rounded-grand bg-carte px-6 py-8 text-center shadow-elev-1 md:mt-12 md:p-12">
      <span className="flex size-[72px] items-center justify-center rounded-full bg-action-teinte">
        <Icone nom="coche-grande" taille={36} />
      </span>
      <h1 className="text-titre font-bold text-texte">
        Bravo, votre {mot} est {accord} !
      </h1>
      <p className="text-corps text-texte-2">Comment s’est passé le montage ?</p>
      <Note valeur={note} onChange={setNote} />
      <Champ
        etiquette="Une étape vous a posé problème ?"
        placeholder="Étape 7 : les trous du panneau étaient difficiles à repérer."
        value={commentaire}
        onChange={(e) => setCommentaire(e.target.value)}
        className="w-full text-left"
      />
      <div className="flex w-full flex-col-reverse gap-3 md:flex-row md:justify-center">
        <Bouton type="Texte" pleineLargeur className="md:w-auto" onClick={passer}>
          Passer
        </Bouton>
        <Bouton type="Primaire" pleineLargeur className="md:w-auto" onClick={envoyer}>
          Envoyer mon avis
        </Bouton>
      </div>
    </div>
  );
}
