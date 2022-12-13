import Head from "next/head";
import Link from "next/link";
import React from "react";

const HundredThousandViewers = () => {
  return (
    <>
      <Head>
        <title>Has Wyatt Hit 100k subs yet???</title>
      </Head>
      <main className="text-center flex flex-col items-center font-bold">
        <h1 className="text-2xl md:text-4xl p-8 md:p-16">
          HAS SCPWYATT REACHED 100K SUBSCRIBERS ON THE YOUTUBE YET?
        </h1>
        <h2 className="text-5xl md:text-7xl font-bold p-8 md:p-16 m-8 md:m-16 bg-gray-100 md:max-w-3xl rounded-xl">
          <div>LMAO NO.</div>
          <div>BE REALISTIC.</div>
        </h2>
        <Link href="/50k-viewers" passHref >
          <span className="cursor-pointer underline">
            
            Back</span>
        </Link>
      </main>
    </>
  );
};
export default HundredThousandViewers;
