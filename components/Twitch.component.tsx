export const Twitch = () => {
  const URLPATH =
    process.env.NODE_ENV === "development" ? "localhost:3000" : "www.wyatt.gg";
  return (
    <div className="grid justify-center">
      <div className="my-6 max-w-5xl" style={{ width: "97vw" }}>
        <div className="">
          <iframe
            src={`https://player.twitch.tv/?channel=scpwyatt&parent=${URLPATH}`}
            allowFullScreen={true}
            scrolling="no"
            height="400rem"
            width="100%"
          ></iframe>
        </div>
        <div className="">
          <iframe
            id="chat_embed"
            src={`https://www.twitch.tv/embed/scpwyatt/chat?parent=${URLPATH}&darkpopout`}
            height="500rem"
            width="100%"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
