import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "@/components/Header.component";
import { Footer } from "@/components/Footer.component";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
  }, [darkMode]);


  return (
    <>
      <Head>
        <title>
          {router.pathname === "/"
            ? "Wyatt.gg | HOME"
            : `Wyatt.gg | ${router.pathname.slice(1)}`}
        </title>
        <meta name="description" content="Wyatt's Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* <button onClick={() => setDarkMode(!darkMode)}>Dark Mode</button> */}
      <div className={`flex justify-center ${darkMode && "dark"}`}>
        <div className="w-11/12 max-w-screen-2xl dark:bg-gray-800">
          <Component {...pageProps} />
          <Footer />
        </div>
      </div>
    </>
  );
}
export default MyApp;
