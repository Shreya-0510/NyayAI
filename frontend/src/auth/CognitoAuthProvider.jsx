// src/auth/CognitoAuthProvider.jsx
import React from "react";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_VFVRvHo03",
  client_id: "1qphnf8p4ng8grengkj2b7t7ve",
  redirect_uri: "http://localhost:5173/",
  response_type: "code",
  scope: "email openid",
};

export default function CognitoAuthProvider({ children }) {
  return <AuthProvider {...cognitoAuthConfig}>{children}</AuthProvider>;
}
