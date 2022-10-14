import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { theme } from "./theme";

import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <BrowserRouter basename="/CPSC-362-Group-Project">
        <CssBaseline />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </AuthProvider>
);
