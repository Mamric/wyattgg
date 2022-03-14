import Head from "next/head";
import { Twitch } from "../components/Twitch.component";
import { Footer } from "../components/Footer.component";
import { Header } from "../components/Header.component";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Homepage | Wyatt.gg</title>
        <meta name="description" content="Wyatt's Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center w-full">
        <div className="my-3">
          <h1 className="text-7xl text-gray-100">
            Welcome to{" "}
            <a
              href="https://www.twitch.tv/scpWyatt"
              className="text-blue-700 hover:underline"
            >
              Wyatt.gg!
            </a>
          </h1>
          <p className=" text-gray-100 text-3xl mt-2">More to come soon. 🚀</p>
        </div>
        <Twitch />
      </main>
    </div>
  );
}
