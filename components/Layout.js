import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import InvitationModal from "./InvitationModal";
import RulesModal from "./RulesModal";

export const AppContext = createContext("");

const Layout = (props) => {
  const Router = useRouter();
  const [rules, setRules] = useState(false);
  const [ruleBtnMessage, setRuleBtnMessage] = useState("start");
  const [invitation, setInvitation] = useState(false);
  const [results, setResults] = useState([0, 0, 0]);
  const [typologyEntries, setTypologyEntries] = useState(null);

  const hello = "hello";

  useEffect(() => {
    // unmount rules modal on router change
    Router.events.on("routeChangeStart", (url, { shallow }) => {
      setRules(false);
      setRuleBtnMessage("start");
    });
  }, []);

  useEffect(() => {
    console.log(results);
  }, [results]);

  // user profile states
  const [navChart, setNavChart] = useState([0, 0, 0]);
  const [accordion, setAccordion] = useState([true, false, false]);
  const [descriptionsAccordion, setDescriptionsAccordion] = useState([
    true,
    false,
    false,
  ]);
  // const description = typeDescriptions;

  return (
    <>
      {rules && <RulesModal btnMessage={ruleBtnMessage} setRules={setRules} />}
      {invitation && <InvitationModal setInvitation={setInvitation} />}
      <div>
        <AppContext.Provider
          value={{
            hello,
            setRules,
            setRuleBtnMessage,
            navChart,
            setNavChart,
            accordion,
            setAccordion,
            descriptionsAccordion,
            setDescriptionsAccordion,
            results,
            setResults,
            setInvitation,
            typologyEntries,
            setTypologyEntries,
          }}
        >
          <main className="z-20">{props.children}</main>
        </AppContext.Provider>
      </div>
    </>
  );
};

export default Layout;
