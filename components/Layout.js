import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import RulesModal from "./RulesModal";

export const AppContext = createContext("");

const Layout = (props) => {
  const Router = useRouter();
  const [rules, setRules] = useState(false);
  const [ruleBtnMessage, setRuleBtnMessage] = useState("start");

  const hello = "hello";

  useEffect(() => {
    // unmount rules modal on router change
    Router.events.on("routeChangeStart", (url, { shallow }) => {
      setRules(false);
      setRuleBtnMessage("start");
    });
  }, []);

  return (
    <>
      {rules && <RulesModal btnMessage={ruleBtnMessage} setRules={setRules} />}
      <div>
        <AppContext.Provider
          value={{
            hello,
            setRules,
            setRuleBtnMessage,
          }}
        >
          <main className="z-20">{props.children}</main>
          <div className="z-30">
            <div className="container min-h-[2.5rem] border-x border-gray-800">
              <p>hello</p>
            </div>
          </div>
        </AppContext.Provider>
      </div>
    </>
  );
};

export default Layout;
