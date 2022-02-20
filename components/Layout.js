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
      </AppContext.Provider>
    </div>
  );
};

export default Layout;
