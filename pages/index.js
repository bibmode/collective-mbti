import { Icon } from "@iconify/react";
import { getSession, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import Blob from "../components/Blob";
import LandingPage from "../components/firstPageUI/LandingPage";
import UserMainPage from "../components/firstPageUI/UserMainPage";

export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
  }, []);

  if (session) {
    return <UserMainPage session={session} />;
  }

  if (!session) {
    return <LandingPage />;
  }
}
