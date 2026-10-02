import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const root = document.getElementById("root");

if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
