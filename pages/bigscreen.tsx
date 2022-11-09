import Head from "next/head";
import dynamic from "next/dynamic";

const DynamicTwitch = dynamic(() => import("@/components/Twitch.component"), {
  ssr: false,
});

export default function bigscreenPage() {
  const URLPATH =
    process.env.NODE_ENV === "development" ? "localhost:3000" : "www.wyatt.gg";

  return (
    <div>
      <Head>
        <meta name="description" content="Wyatt's Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* TODO: FINISH THIS */}
      <main className="w-full">
        <div>
          <div className="w-full h-1/2">
            <iframe
              src={`https://player.twitch.tv/?channel=scpwyatt&parent=${URLPATH}`}
              allowFullScreen={true}
              scrolling="no"
              seamless={true}
              width="100%"
              height="100%"
            ></iframe>
          </div>
          {/* <div>
            <iframe
              id="chat_embed"
              src={`https://www.twitch.tv/embed/scpwyatt/chat?parent=${URLPATH}&darkpopout`}
              height="500rem"
              width="100%"
            ></iframe>
          </div> */}
        </div>
      </main>
    </div>
  );
}
