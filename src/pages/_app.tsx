import type { AppProps } from 'next/app'
import Header from '../components/common/Head'
import Footer from '../components/common/Foot'
import '../app/globals.css'
export default function App({ Component, pageProps }: AppProps) {
  return <>
  <Header />
  <Component {...pageProps} />
  <Footer />
  </>
}