import React from "react";
import * as ReactRedux from "react-redux";
import { store } from "../redux/store";
import CurrentUserProvider from "./CurrentUserProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import envConfig from "../config/env.config";
type TProvider = {
  children: React.ReactNode;
};

export default function Provider({ children }: TProvider) {
  return (
    <ReactRedux.Provider store={store}>
      <GoogleOAuthProvider clientId={envConfig.google.clientId}>
        <CurrentUserProvider>{children}</CurrentUserProvider>
      </GoogleOAuthProvider>
    </ReactRedux.Provider>
  );
}
