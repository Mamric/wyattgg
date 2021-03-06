import Link from "next/link";
import { Router, useRouter } from "next/router";

type link = { url: string; text: string; newPage?: Boolean };
const linkStyles = "m-2 p-1 hover:cursor-pointer align-middle";
const links: link[] = [
  {
    url: "/weight",
    text: "Weight",
  },
  {
    url: "//twitch.tv/scpWyatt",
    text: "Twitch",
    newPage: true,
  },
  {
    url: "//discord.gg/scpWyatt",
    text: "Discord",
    newPage: true,
  },
  {
    url: "//reddit.com/r/scpWyatt2",
    text: "Reddit",
    newPage: true,
  },
];

export const Header = () => {
  const router = useRouter();

  return (
    <div className="border-solid border-b-2 border-gray-800 pb-3 py-1">
      <div className="max-w-6xl mx-auto">
        <div className="text-gray-100 text-lg md:flex items-center justify-center md:justify-start text-center">
          <Link href="/">
            <a
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500 mx-2 pb-1 text-4xl font-bold"
              title={"Wyatt.gg Home"}
            >
              Wyatt.gg
            </a>
          </Link>
          <div>
            <span className="active:color-blue-100">
              {links.map((l) =>
                l.newPage ? (
                  <a
                    key={l.text}
                    href={l.url}
                    title={"Go to the " + l.text}
                    target={"_blank"}
                    rel="noreferrer"
                    className={linkStyles + " hover:underline"}
                  >
                    {l.text}
                  </a>
                ) : (
                  <Link key={l.text} href={l.url}>
                    <a
                      rel="noreferrer"
                      title={l.text}
                      className={
                        linkStyles +
                        (router.pathname == l.url ? "" : "") +
                        " hover:underline"
                      }
                    >
                      {l.text}
                    </a>
                  </Link>
                )
              )}
            </span>
            <DonateButton />
          </div>
          {/* re-add when /bigscreen is completed */}
          {/* <BigScreenButton /> */}
        </div>
      </div>
    </div>
  );
};

const Socials = () => (
  <>
    {links.map((l) =>
      l.newPage ? (
        <a
          key={l.text}
          href={l.url}
          target={"_blank"}
          rel="noreferrer"
          className={linkStyles + " hover:underline"}
        >
          {l.text}
        </a>
      ) : (
        <Link key={l.text} href={l.url}>
          <a rel="noreferrer" className={linkStyles + " hover:underline"}>
            {l.text}
          </a>
        </Link>
      )
    )}
  </>
);

const DonateButton = () => (
  <a
    href="//streamelements.com/scpwyatt/tip"
    target="_blank"
    rel="noreferrer"
    title="Donate to Wyatt!"
    className={
      linkStyles +
      " bg-red-600 rounded-md hover:bg-red-700 transition-all duration-75 ease-in-out"
    }
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
