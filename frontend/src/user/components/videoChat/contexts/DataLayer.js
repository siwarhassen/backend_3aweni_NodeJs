import React, { createContext, useContext, useReducer } from "react";

export const LoginContext = createContext();

export const DataLayer = ({ initialState, reducer, children }) => {
  return (
    <LoginContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </LoginContext.Provider>
  );
};

export const useDataLayerValue = () => useContext(LoginContext);
