import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMeuble } from "@/data/meubles";
import { VerificationClient } from "./VerificationClient";

export const metadata: Metadata = { title: "Vérifiez vos pièces · Assemblo" };

export default async function Page({ params }: PageProps<"/meuble/[slug]/verification">) {
  const { slug } = await params;
  if (!getMeuble(slug)) notFound();
  return <VerificationClient slug={slug} />;
}
