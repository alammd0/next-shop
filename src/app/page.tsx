"use client"

import { redirect } from "next/navigation";
import Navbar from "./components/common/Navbar";
import { useSession } from "next-auth/react";


export default function Home() {

  const { data: session } = useSession()
  console.log(session);
  const user = session?.user as { role: string };

  if (user?.role === "HOST") {
    redirect("/host/dashboard");
  } else {
    redirect("/home")
  }
}