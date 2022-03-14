import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "../components/Header.component";
import { Footer } from "../components/Footer.component";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
export default MyApp;
