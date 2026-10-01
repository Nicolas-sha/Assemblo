"use client";

import { useRouter } from "next/navigation";
import { Bouton } from "@/components/ui/Bouton";
import { Icone } from "@/components/ui/Icone";
import { useToast } from "@/components/ui/Toast";
import { useAppState } from "@/lib/app-state";

export function ProfilClient() {
  const { setConnecte, montagesTermines } = useAppState();
  const { afficherToast } = useToast();
  const router = useRouter();

  function deconnecter() {
    setConnecte(false);
    afficherToast("info", "Vous êtes déconnecté.");
    router.replace("/login");
  }

  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col items-center gap-6 pt-8 text-center md:pt-12">
      <Icone nom="avatar" taille={72} />
      <div className="flex flex-col gap-1">
        <h1 className="text-titre font-bold text-texte">Léa</h1>
        <p className="text-corps text-texte-2">lea@exemple.fr</p>
        <p className="text-corps text-texte-2">
          {montagesTermines.length} montage{montagesTermines.length > 1 ? "s" : ""} terminé{montagesTermines.length > 1 ? "s" : ""}
        </p>
      </div>
      <Bouton type="Secondaire" libelle="Se déconnecter" onClick={deconnecter} pleineLargeur className="md:w-auto" />
    </div>
  );
}
