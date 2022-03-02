import { Icon } from "@iconify/react";
import { getSession, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect } from "react";
import Blob from "../components/Blob";
import LandingPage from "../components/firstPageUI/LandingPage";
import UserMainPage from "../components/firstPageUI/UserMainPage";
import { AppContext } from "../components/Layout";

const Home = ({ mbti }) => {
  const { data: session } = useSession();
  const { results, setResults } = useContext(AppContext);

  useEffect(() => {
    setResults(mbti);
  }, [mbti]);

  if (session) {
    return <UserMainPage session={session} />;
  }

  if (!session) {
    return <LandingPage />;
  }
};

export default Home;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  console.log(session);

  if (session) {
    const { selfTested, AccordingToFriends, AccumulativeResult } = session.user;

    return {
      props: {
        mbti: [selfTested, AccordingToFriends, AccumulativeResult],
      },
    };
  }

  return {
    props: {
      mbti: null,
    },
  };
}
