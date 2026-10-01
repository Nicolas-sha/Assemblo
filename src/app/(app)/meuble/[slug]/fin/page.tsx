import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMeuble } from "@/data/meubles";
import { FinClient } from "./FinClient";

export const metadata: Metadata = { title: "Montage terminé · Assemblo" };

export default async function Page({ params }: PageProps<"/meuble/[slug]/fin">) {
  const { slug } = await params;
  const meuble = getMeuble(slug);
  if (!meuble) notFound();
  return <FinClient slug={slug} nomMeuble={meuble.nom} />;
}
