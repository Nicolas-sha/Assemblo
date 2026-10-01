import type { Metadata } from "next";
import { Accueil } from "./Accueil";

export const metadata: Metadata = { title: "Accueil · Assemblo" };

export default function PageAccueil() {
  return <Accueil />;
}
