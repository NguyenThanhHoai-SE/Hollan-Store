import type { AppProps } from "next/app";
import Footer from "../components/common/Foot";
import dynamic from "next/dynamic";
const NoSSR = dynamic(() => import("../components/common/Head"), {
  ssr: false,
});
import "../app/globals.css";
import { MainLayoutProvider } from "@/components/common/Head/MainLayoutContext";
import type { NextPage } from "next";
import { ReactElement } from "react";

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => JSX.Element;
  title?: string;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  let getLayout =
    Component.getLayout ??
    ((page) => {
      return (
        <>
          <NoSSR />
          {page}
          <Footer />
        </>
      );
    });

  return (
    <>
      <MainLayoutProvider>
        {getLayout(<Component {...pageProps} />)}
      </MainLayoutProvider>
    </>
  );
}
