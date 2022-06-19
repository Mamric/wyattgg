import Head from "next/head";
import dynamic from "next/dynamic";
// import Twitch from "../components/Twitch.component";
const DynamicTwitch = dynamic(() => import("../components/Twitch.component"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Head>
        <meta name="description" content="Wyatt's Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center w-full">
        <div className="my-3">
          <h1 className="text-7xl text-gray-100">
            Welcome to{" "}
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500 font-bold"
            >
              Wyatt.gg!
            </span>
          </h1>
          <p className=" text-gray-100 text-3xl mt-2">More to come soon. 🚀</p>
        </div>
        <DynamicTwitch />
      </main>
    </div>
  );
}
