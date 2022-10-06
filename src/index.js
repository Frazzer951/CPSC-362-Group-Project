import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <BrowserRouter basename="/CPSC-362-Group-Project">
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </AuthProvider>
);
