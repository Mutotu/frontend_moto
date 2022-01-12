import { useState, createContext } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState({});

  const state = {
    userState: [user, setUser],
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
