import type { Metadata } from "next";
import { FormulaireConnexion } from "./FormulaireConnexion";

export const metadata: Metadata = { title: "Connexion · Assemblo" };

export default function PageLogin() {
  return <FormulaireConnexion />;
}
