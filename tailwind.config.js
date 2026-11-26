/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Afgeleid uit het verloop van het Kena-logo
        espresso: "#382C22", // onderkant olifant + woordmerk
        bark: "#59473B",
        taupe: "#7D6556", // gedempte tekst (5:1 op cream)
        clay: { DEFAULT: "#BB8C6F", 700: "#8A5D44", 800: "#6E4A37" }, // bovenkant olifant / actiekleur
        sand: "#CEA893", // midden olifant
        rose: "#C7A490", // blok uit de huidige hero
        blush: "#E7D4C8", // lichte vlakken huidige site
        linen: "#F4EBE4",
        cream: "#FBF7F3",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Figtree"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 6.4vw, 5.5rem)", { lineHeight: "0.98", letterSpacing: "-0.01em" }],
        "display-lg": ["clamp(2.25rem, 4.6vw, 3.75rem)", { lineHeight: "1.04" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.1" }],
      },
      maxWidth: { site: "1240px", prose: "66ch" },
      borderRadius: { blob: "2.5rem" },
      boxShadow: { soft: "0 1px 2px rgba(56,44,34,.06), 0 12px 32px -12px rgba(56,44,34,.18)" },
    },
  },
  plugins: [],
};
