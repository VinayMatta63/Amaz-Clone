import React, { createContext, useContext, useReducer } from "react";

// Create the dataLayer
export const StateContext = createContext();

//Provide the dataLayer to all components
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//Pull information from the dataLayer
export const useStateValue = () => useContext(StateContext);
