import Link from "next/link";
import Image from "next/image";

type link = { url: string; text: string; newPage?: Boolean };
const linkStyles = "ml-2 p-1 hover:cursor-pointer align-middle";
const links: link[] = [
  {
    url: "/weight",
    text: "Weight"
  },
  {
    url: "//twitch.tv/scpWyatt",
    text: "Twitch",
    newPage: true
  },
  {
    url: "//discord.gg/scpWyatt",
    text: "Discord",
    newPage: true
  },
  {
    url: "//reddit.com/r/scpWyatt2",
    text: "Reddit",
    newPage: true
  },
];

export const Header = () => {
  return (
    <div className="py-2">
      <div className="text-gray-100 text-lg md:flex items-center justify-center md:justify-start text-center">
        <Link href="/">
          <a className="mx-2 text-4xl align-middle hover:underline">Wyatt.gg</a>
        </Link>
        <div>
          <Socials />
          <DonateButton />
        </div>
        {/* re-add when /bigscreen is completed */}
        {/* <BigScreenButton /> */}
      </div>
    </div>
  );
};

const Socials = () => (
  <>
    {links.map((l) => (
      <a
        key={l.text}
        href={l.url}
        target={l.newPage ? "_blank" : "_self"}
        rel="noreferrer"
        className={linkStyles + " hover:underline"}
      >
        {l.text}
      </a>
    ))}
  </>
);

const DonateButton = () => (
  <a
    href="//streamelements.com/scpwyatt/tip"
    target="_blank"
    rel="noreferrer"
    className={linkStyles + " bg-red-600 rounded-sm hover:bg-red-700"}
  >
    Donate
  </a>
);

const BigScreenButton = () => (
  <span className="ml-auto mr-2">
    <Link href="/bigscreen">
      <a className=" align-middle hover:underline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 fill-black inline align-middle pr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        Big Screen
      </a>
    </Link>
  </span>
);
