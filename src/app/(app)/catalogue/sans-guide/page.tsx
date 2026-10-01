import type { Metadata } from "next";
import { SansGuide } from "./SansGuide";

export const metadata: Metadata = { title: "Meuble sans guide · Assemblo" };

export default function PageSansGuide() {
  return <SansGuide />;
}
