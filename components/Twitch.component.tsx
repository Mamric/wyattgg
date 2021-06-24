export const Twitch = () => {
  const URLPATH =
    process.env.NODE_ENV === "development" ? "localhost:3000" : "www.wyatt.gg";
  return (
    <div>
      <div className="grid justify-center my-6">
        <iframe
          src={`https://player.twitch.tv/?channel=scpwyatt&parent=${URLPATH}`}
          frameBorder="0"
          allowFullScreen={true}
          scrolling="no"
          height="378"
          width="620"
        ></iframe>
        <iframe
          id="chat_embed"
          src={`https://www.twitch.tv/embed/scpwyatt/chat?parent=${URLPATH}&darkpopout`}
          height="378"
          width="620"
        ></iframe>
      </div>
    </div>
  );
};
