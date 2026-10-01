import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEtape } from "@/data/guide";
import { getMeuble } from "@/data/meubles";
import { EtapeClient } from "./EtapeClient";

export async function generateMetadata({ params }: PageProps<"/meuble/[slug]/etape/[n]">): Promise<Metadata> {
  const { n } = await params;
  return { title: `Étape ${n} sur 15 · Assemblo` };
}

export default async function Page({ params }: PageProps<"/meuble/[slug]/etape/[n]">) {
  const { slug, n } = await params;
  const meuble = getMeuble(slug);
  const numero = /^\d+$/.test(n) ? Number(n) : NaN;
  const etape = getEtape(numero);
  if (!meuble || !etape) notFound();
  return <EtapeClient slug={slug} nomMeuble={meuble.nom} etape={etape} />;
}
