"use client";

import { useRouter } from "next/navigation";
import { useEffect, type FormEvent } from "react";
import { Bouton } from "@/components/ui/Bouton";
import { Champ } from "@/components/ui/Champ";
import { Icone } from "@/components/ui/Icone";
import { useAppState } from "@/lib/app-state";

export function FormulaireConnexion() {
  const { connecte, pret, setConnecte } = useAppState();
  const router = useRouter();

  useEffect(() => {
    if (pret && connecte) router.replace("/");
  }, [pret, connecte, router]);

  function entrer() {
    setConnecte(true);
    router.push("/");
  }

  function surSoumission(e: FormEvent) {
    e.preventDefault();
    entrer();
  }

  return (
    <main className="flex min-h-screen flex-1 flex-col md:flex-row">
      <section className="flex h-[280px] shrink-0 flex-col bg-action px-6 pt-16 md:h-auto md:w-1/2 md:max-w-[640px] md:px-12 md:pt-24 lg:px-24">
        <div className="flex items-center gap-3">
          <Icone nom="logo" taille={48} className="md:size-14" />
          <span className="text-sous-titre font-semibold text-texte-inverse">Assemblo</span>
        </div>
        <p className="mt-6 max-w-[440px] text-sous-titre font-bold text-texte-inverse md:mt-auto md:mb-auto md:text-titre">
          Montez votre meuble sans stress, une étape à la fois.
        </p>
      </section>

      <section className="flex flex-1 items-start justify-center px-6 py-8 md:items-center md:px-12 md:py-0">
        <form onSubmit={surSoumission} className="flex w-full max-w-[400px] flex-col gap-4">
          <h1 className="text-titre font-bold text-texte">Connexion</h1>
          <p className="text-corps text-texte-2">Connectez-vous pour retrouver vos meubles et vos montages.</p>
          <Champ etiquette="Adresse e-mail" type="email" defaultValue="lea@exemple.fr" autoComplete="email" />
          <Champ etiquette="Mot de passe" type="password" defaultValue="••••••••" autoComplete="current-password" />
          <Bouton htmlType="submit" libelle="Se connecter" pleineLargeur />
          <Bouton type="Texte" libelle="Créer un compte" onClick={entrer} className="self-center" />
        </form>
      </section>
    </main>
  );
}
