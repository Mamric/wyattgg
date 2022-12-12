import Head from "next/head";
import React from "react";

const FiftyThousandViewers = () => {
  return (
    <>
      <Head>
        <title>Has Wyatt Hit 50k subs yet???</title>
      </Head>
      <main className="text-center flex flex-col items-center font-bold">
        <h1 className="text-2xl md:text-4xl p-8 md:p-16">
          HAS SCPWYATT REACHED 50K VIEWERS ON THE YOUTUBE YET?
        </h1>
        <h2 className="text-5xl md:text-9xl font-bold p-8 md:p-16 m-8 md:m-16 bg-gray-100 w-72 md:w-96 rounded-xl">
          NO.
        </h2>
      </main>
    </>
  );
};
export default FiftyThousandViewers;
