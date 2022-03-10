import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import UserMainPage from "../components/firstPageUI/UserMainPage";
import { AppContext } from "../components/Layout";
import getMBTIAnalysis from "../util/getMBTIAnalysis";

const UserPage = ({ user, typology }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { results, setResults, setTypologyEntries } = useContext(AppContext);

  useEffect(() => {
    console.log(user);
    console.log(typology);
    setTypologyEntries(typology.reverse());
    setResults([
      user.selfTested,
      user.AccordingToFriends,
      user.AccumulativeResult,
    ]);
  }, []);

  // if user on link is logged on user
  if (session?.sub === user._id) {
    return <UserMainPage user={session.user} self={true} />;
  }

  // if visiting another user page
  return <UserMainPage user={user} self={false} />;
};

export default UserPage;

export async function getServerSideProps(ctx) {
  const { userId } = ctx.query;
  let mbti = null;

  const URL =
    process.env.NODE_ENV === "development"
      ? process.env.DEV_URL
      : process.env.PROD_URL;

  // 2.
  // get typology of user
  let responseTypology = await fetch(`${URL}/api/user`, {
    method: "POST",
    body: JSON.stringify({ userId, reqFunction: "getTypology" }),
  });

  // get the array of typology
  let typology = await responseTypology.json();

  // add friends typology to user account
  if (typology.message.length) {
    let choices = [];

    typology.message.map((item) => {
      choices.push(...item.choices);
    });

    const friendsResult = getMBTIAnalysis(choices, "According to Friends");

    console.log(friendsResult);

    let responseFriends = await fetch(`${URL}/api/user`, {
      method: "POST",
      body: JSON.stringify({
        userId,
        reqFunction: "updateAccordingToFriends",
        friendsResult,
      }),
    });

    await responseFriends.json();
  }

  // 1.
  // get user info
  let responseUser = await fetch(`${URL}/api/user`, {
    method: "POST",
    body: JSON.stringify({ userId, reqFunction: "getUser" }),
  });

  // get the data
  let dataUser = await responseUser.json();

  return {
    props: {
      user: dataUser.success ? dataUser.message[0] : null,
      typology: typology.success ? typology.message : null,
      // AccordingToFriends: friendsResult,
    },
  };
}
