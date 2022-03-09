import { Icon } from "@iconify/react";
import { getSession, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Blob from "../components/Blob";
import LandingPage from "../components/firstPageUI/LandingPage";
import UserMainPage from "../components/firstPageUI/UserMainPage";

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push(`/${session.user.sub}`);
  }

  return <LandingPage />;
};

export default Home;
