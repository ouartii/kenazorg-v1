import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";

const tracking = JSON.parse(readFileSync(new URL("./tracking.config.json", import.meta.url), "utf8")) as {
  ga4MeasurementId: string;
  searchConsoleVerification: string;
};

// Voegt Search Console-verificatie en (alleen als er een GA4-ID is) gtag met Consent Mode v2 toe.
function trackingPlugin(isPreview: boolean): Plugin {
  return {
    name: "kena-tracking",
    transformIndexHtml(html) {
      let head = "";
      if (tracking.searchConsoleVerification)
        head += `<meta name="google-site-verification" content="${tracking.searchConsoleVerification}">`;
      if (tracking.ga4MeasurementId && !isPreview) {
        const id = tracking.ga4MeasurementId;
        head += `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});try{if(localStorage.getItem('kena-consent')==='granted')gtag('consent','update',{analytics_storage:'granted'})}catch(e){}gtag('js',new Date());gtag('config','${id}',{send_page_view:false});window.__GA_ID='${id}'</script><script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>`;
      }
      return html.replace("<!--tracking-->", head);
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), trackingPlugin(mode === "preview")],
  define: { __PREVIEW__: JSON.stringify(mode === "preview") },
}));
