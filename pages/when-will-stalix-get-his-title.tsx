import Head from "next/head";
import React from "react";
import Countdown from "react-countdown";
import { Footer } from "../components/Footer.component";
import { Header } from "../components/Header.component";

export default function protoCDPage() {
    const YEARS = 999999
  const FINAL_DATE = (1000 * 60 * 60 * 24 * 365 * YEARS);
  return (
    <>
      <Head>
        <meta name="description" content="Wyatt's Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-10">
        <div className="text-center w-full text-gray-100 text-5xl">
          When Will Stalix Get His Discord Title?
        </div>
        <div className="text-center w-full text-gray-100 text-3xl">
        Stalix will get his Discord Title in approximately:
        </div>
        <div className="text-center w-full text-gray-100 text-3xl pt-4">
          <Countdown date={FINAL_DATE} />
        </div>
      </main>
    </>
  );
}
