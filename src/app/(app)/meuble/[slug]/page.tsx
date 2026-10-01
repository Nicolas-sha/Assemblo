import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMeuble } from "@/data/meubles";
import { FicheMeuble } from "./FicheMeuble";

export async function generateMetadata({ params }: PageProps<"/meuble/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const meuble = getMeuble(slug);
  return { title: meuble ? `${meuble.nom} · Assemblo` : "Meuble introuvable · Assemblo" };
}

export default async function PageMeuble({ params }: PageProps<"/meuble/[slug]">) {
  const { slug } = await params;
  const meuble = getMeuble(slug);
  if (!meuble) notFound();
  return <FicheMeuble meuble={meuble} />;
}
