import type { AppProps } from "next/app";
import Footer from "../components/common/Foot";
import dynamic from 'next/dynamic'
const NoSSR = dynamic(() => import('../components/common/Head'), { ssr: false })
import "../app/globals.css";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NoSSR />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
