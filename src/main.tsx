import { StrictMode, lazy, type ComponentType } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter, HashRouter, matchPath } from "react-router-dom";
import App, { type PageMap } from "./App";
import Home from "./pages/Home";
import { LOADERS } from "./pages";
import { ROUTES } from "./routes";
import "./index.css";

async function start() {
  const path = __PREVIEW__ ? window.location.hash.replace(/^#/, "").split("#")[0] || "/" : window.location.pathname;
  const pages: PageMap = { Home };
  for (const [k, load] of Object.entries(LOADERS)) pages[k] = lazy(load);

  // Laad de pagina van de huidige URL vóór hydratie, zodat de HTML exact overeenkomt.
  const match = ROUTES.find((r) => matchPath(r.path, path));
  const key = match ? match.page : "NotFound";
  if (key !== "Home") pages[key] = (await LOADERS[key]()).default as ComponentType;

  const Router = __PREVIEW__ ? HashRouter : BrowserRouter;
  const app = (
    <StrictMode>
      <Router>
        <App pages={pages} />
      </Router>
    </StrictMode>
  );
  const root = document.getElementById("root")!;
  if (root.hasChildNodes() && !__PREVIEW__) hydrateRoot(root, app);
  else createRoot(root).render(app);
}

start();
