"use client";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  console.log(session?.user)
  if (session?.user) {
    redirect("/dashboard")
  } else {
    redirect("/api/auth/signin")
  }
  
}
