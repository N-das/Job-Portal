import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

export const Context = createContext({ isAuthorised: false });
const Appwrapper = () => {
  const [isAuthorised, setIsAuthorised] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider value={{ isAuthorised, setIsAuthorised, user, setUser }}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Appwrapper />
  </React.StrictMode>
);
