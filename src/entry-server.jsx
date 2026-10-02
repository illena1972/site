import React from "react";
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { Home } from "./App.jsx";

export function render() {
  const helmetContext = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <Home />
    </HelmetProvider>,
  );

  return { html };
}