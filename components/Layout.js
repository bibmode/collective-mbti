import { createContext, useState } from "react";

export const AppContext = createContext("");

const Layout = (props) => {
  const hello = "hello";

  return (
    <div>
      <AppContext.Provider
        value={{
          hello,
        }}
      >
        <main>{props.children}</main>
        <div className="">
          <div className="container min-h-[2.5rem] border-x border-gray-800">
            <p>hello</p>
          </div>
        </div>
      </AppContext.Provider>
    </div>
  );
};

export default Layout;
