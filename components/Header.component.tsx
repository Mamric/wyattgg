import Link from "next/link";

type link = { url: string; text: string };
const linkStyles = "ml-2 p-1 hover:cursor-pointer align-middle";
const links: link[] = [
  {
    url: "//twitch.tv/scpWyatt",
    text: "Twitch",
  },
  {
    url: "//discord.gg/scpWyatt",
    text: "Discord",
  },
  {
    url: "//reddit.com/r/scpWyatt",
    text: "Reddit",
  },
];

export const Header = () => {
  return (
    <div className="text-gray-100 py-2 text-lg">
      <Link href="/">
        <a className="mx-2 text-4xl align-middle hover:underline">Wyatt.gg</a>
      </Link>
      {links.map((l) => (
        <a
          key={l.text}
          href={l.url}
          target="_blank"
          rel="noreferrer"
          className={linkStyles + " hover:underline"}
        >
          {l.text}
        </a>
      ))}
      <a
        href="//streamelements.com/scpwyatt/tip"
        target="_blank"
        rel="noreferrer"
        className={linkStyles + " bg-red-600 rounded-sm hover:bg-red-700"}
      >
        Donate
      </a>
    </div>
  );
};
