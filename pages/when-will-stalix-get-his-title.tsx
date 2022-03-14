import React from "react";
import Countdown from "react-countdown";
import { Footer } from "../components/Footer.component";
import { Header } from "../components/Header.component";

export default function protoCDPage() {
  const FINAL_DATE = Date.now() + 1000 * 60 * 60 * 24 * 365 * 2;
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}
