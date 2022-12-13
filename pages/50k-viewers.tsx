import Head from "next/head";
import Link from "next/link";
import React from "react";

const FiftyThousandViewers = () => {
  return (
    <>
      <Head>
        <title>Has Wyatt Hit 50k subs yet???</title>
      </Head>
      <main className="text-center flex flex-col items-center font-bold">
        <h1 className="text-2xl md:text-4xl p-8 md:p-16">
          HAS SCPWYATT REACHED 50K SUBSCRIBERS ON THE YOUTUBE YET?
        </h1>
        <h2 className="text-5xl md:text-9xl font-bold p-8 md:p-16 m-8 md:m-16 bg-gray-100 w-72 md:w-96 rounded-xl">
          YES.
        </h2>
        <Link href="/100k-viewers" passHref >
          <span className="cursor-pointer underline">Has he reached 100k yet?</span>
        </Link>
      </main>
    </>
  );
};
export default FiftyThousandViewers;
