// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// AWS Amplify setup
import { Amplify } from "aws-amplify";
import awsConfig from "./utils/awsConfig";
Amplify.configure(awsConfig);

// ✅ New import
import CognitoAuthProvider from "./auth/CognitoAuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CognitoAuthProvider>
        <App />
      </CognitoAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
