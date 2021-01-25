import React from "react";
const token = localStorage.getItem("spottok");
export const AppContext = React.createContext({
    token: token
});