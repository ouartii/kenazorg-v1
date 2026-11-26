import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App, { type PageMap } from "./App";
import { SeoProvider, headTags, type SeoData } from "./lib/seo";
import Home from "./pages/Home";
import Aanbod from "./pages/Aanbod";
import OverOns from "./pages/OverOns";
import Hulpvragers from "./pages/Hulpvragers";
import * as Forms from "./pages/FormPages";
import * as Info from "./pages/InfoPages";
export { ROUTES } from "./routes";

const pages: PageMap = {
  Home,
  Aanbod,
  OverOns,
  Hulpvragers,
  Contact: Forms.Contact,
  Aanmelden: Forms.Aanmelden,
  Vooroverleg: Forms.Vooroverleg,
  Aanmeldformulier: Forms.Aanmeldformulier,
  Vacatures: Forms.Vacatures,
  Uitsluitingscriteria: Info.Uitsluitingscriteria,
  Klachtenprocedure: Info.Klachtenprocedure,
  Privacy: Info.Privacy,
  Bedankt: Info.Bedankt,
  NotFound: Info.NotFound,
};

export function render(url: string) {
  const collector: { data?: SeoData } = {};
  const html = renderToString(
    <SeoProvider collector={collector}>
      <StaticRouter location={url}>
        <App pages={pages} />
      </StaticRouter>
    </SeoProvider>,
  );
  return { html, head: collector.data ? headTags(collector.data) : "" };
}
