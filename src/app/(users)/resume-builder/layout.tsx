import React, { ReactNode } from "react";
import { Metadata } from "next";
interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Resumes - CareerCraft.ai",
  description: "Resumes - CareerCraft.ai | AI Resume Builder",
};

export default async function Resumelayout({ children }: Props) {
  return <>{children}</>;
}
