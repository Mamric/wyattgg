export default function Twitch() {
  const URLPATH =
    process.env.NODE_ENV === "development" ? "localhost:3000" : "www.wyatt.gg";
  return (
    <div className="flex justify-center">
      <div className="max-w-4xl flex-1">
        <iframe
          src={`https://player.twitch.tv/?channel=scpwyatt&parent=${URLPATH}`}
          allowFullScreen={true}
          scrolling="no"
          height="400rem"
          width="100%"
        ></iframe>
        <iframe
          id="chat_embed"
          src={`https://www.twitch.tv/embed/scpwyatt/chat?parent=${URLPATH}&darkpopout`}
          height="500rem"
          width="100%"
        ></iframe>
      </div>
    </div>
  );
}
