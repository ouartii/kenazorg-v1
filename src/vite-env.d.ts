/// <reference types="vite/client" />
declare const __PREVIEW__: boolean;
interface Window {
  gtag?: (...args: unknown[]) => void;
  __GA_ID?: string;
}
