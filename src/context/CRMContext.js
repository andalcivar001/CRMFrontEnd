import React, { useState } from "react";

const CRMContext = React.createContext([{}, () => {}]);

const CRMProvider = (props) => {
  const [auth, guardarAuth] = useState({
    token: "",
    auth: false,
  });

  if (!auth.auth) {
    const token = localStorage.getItem("token");
    if (token) {
      guardarAuth({
        token,
        auth: true,
      });
    }
  }
  console.log(auth.token);

  return (
    <CRMContext.Provider value={[auth, guardarAuth]}>
      {props.children}
    </CRMContext.Provider>
  );
};

export { CRMContext, CRMProvider };
