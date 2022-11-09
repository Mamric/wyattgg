import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "@/components/Header.component";
import { Footer } from "@/components/Footer.component";
import Head from "next/head";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>
          {router.pathname === "/"
            ? "Wyatt.gg | homepage"
            : `Wyatt.gg | ${router.pathname.slice(1)}`}
        </title>
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
export default MyApp;
