import { Suspense, type ComponentType } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import { Layout } from "./components/Layout";

export type PageMap = Record<string, ComponentType>;

export default function App({ pages }: { pages: PageMap }) {
  const NotFound = pages.NotFound;
  return (
    <Layout>
      <Suspense fallback={<div className="min-h-[70vh]" />}>
        <Routes>
          {ROUTES.map((r) => {
            const C = pages[r.page];
            return <Route key={r.path} path={r.path} element={<C />} />;
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
