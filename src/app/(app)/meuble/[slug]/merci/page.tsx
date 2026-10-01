import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Bouton } from "@/components/ui/Bouton";
import { Icone } from "@/components/ui/Icone";
import { getMeuble } from "@/data/meubles";

export const metadata: Metadata = { title: "Merci pour votre avis · Assemblo" };

export default async function Page({ params }: PageProps<"/meuble/[slug]/merci">) {
  const { slug } = await params;
  const meuble = getMeuble(slug);
  if (!meuble) notFound();
  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col items-center gap-6 rounded-grand bg-carte px-6 py-8 text-center shadow-elev-1 md:mt-24 md:p-12">
      <span className="flex size-20 items-center justify-center rounded-full bg-action-teinte">
        <Icone nom="coche-grande" taille={40} />
      </span>
      <h1 className="text-titre font-bold text-texte">Merci d’avoir laissé un avis !</h1>
      <p className="text-corps text-texte-2">
        Votre retour aide les prochains monteurs de la {meuble.nom}. Votre meuble est rangé dans « Mes montages terminés ».
      </p>
      <Bouton type="Primaire" href="/" className="w-full md:w-auto">
        Retour à l’accueil
      </Bouton>
    </div>
  );
}
