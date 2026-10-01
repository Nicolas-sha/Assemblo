import type { Metadata } from "next";
import { Catalogue } from "./Catalogue";

export const metadata: Metadata = { title: "Catalogue · Assemblo" };

export default function PageCatalogue() {
  return <Catalogue />;
}
