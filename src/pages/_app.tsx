import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
const NoSSR = dynamic(() => import("../components/common/Head"), {
  ssr: false,
});
import "../app/globals.css";
import type { NextPage } from "next";
import { ReactElement } from "react";
import Footer from "../components/common/Foot/index";
import { MainLayoutProvider } from "@/components/common/Head/MainLayoutContext";
import InitExposedFunctions from "../components/common/InitExposedFunctions/InitExposedFunctions";
import SpinBase from "@/components/common/SpinBase";

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

console.warn = () => {};

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
        <SpinBase>
          <div>
            <InitExposedFunctions />
            {getLayout(<Component {...pageProps} />)}
          </div>
        </SpinBase>
      </MainLayoutProvider>
    </>
  );
}
