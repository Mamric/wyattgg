import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

type link = { url: string; text: string; newPage?: Boolean };
const linkStyles =
  "m-2 p-1 hover:cursor-pointer align-middle active:text-blue-400 ";
const links: link[] = [
  {
    url: "/references",
    text: "References",
  },
  {
    url: "/works",
    text: "Works",
  },
];

const extLinks: link[] = [
  {
    url: "//youtube.com/scpWyatt",
    text: "Youtube",
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
    <div className="border-solid border-b-2 bg-gradient-to-t from-white to-gray-300  pb-3 py-1 select-none shadow-md md:px-2">
      <div className="max-w-6xl mx-auto">
        <div className="text-gray-800 text-lg md:flex items-center justify-center md:justify-start text-center">
          <Link href="/">
            <a
              className={
                "bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500 mx-2 py-2 text-4xl font-bold border-b-4 border-transparent hover:border-gray-400 transition-all duration-150 "
              }
              title={"Wyatt.gg Home"}
            >
              Wyatt.gg
            </a>
          </Link>
          <span className="active:color-blue-100 flex flex-wrap justify-center md:justify-start my-3">
            <Socials router={router} />
            <ExtSocials />
          </span>
          <DonateButton />
          {/* re-add when /bigscreen is completed */}
          {/* <BigScreenButton /> */}
        </div>
      </div>
    </div>
  );
};

const Socials = ({ router }: { router: NextRouter }) => (
  <span>
    {links.map((l) => (
      <Link key={l.text} href={l.url}>
        <a
          rel="noreferrer"
          title={l.text}
          className={
            linkStyles +
            "hover:border-gray-400 transition-all duration-150 md:pb-3 " +
            (router.pathname == l.url
              ? "border-b-4 border-gray-500 hover:border-gray-500"
              : "border-b-4 border-transparent")
          }
        >
          {l.text}
        </a>
      </Link>
    ))}
  </span>
);
const ExtSocials = () => (
  <span>
    {extLinks.map((l) => (
      <a
        key={l.text}
        href={l.url}
        title={"Go to the " + l.text}
        target={"_blank"}
        rel="noreferrer"
        className={
          linkStyles +
          " group md:pb-3 border-b-4 border-transparent hover:border-gray-400 text-gray-600 text-sm transition-all duration-150"
        }
      >
        {l.text} <span className="text-transparent group-hover:text-gray-400 text-lg transition-all duration-150">↗</span>
      </a>
    ))}
  </span>
);

const DonateButton = () => (
  <a
    href="//streamelements.com/scpwyatt/tip"
    target="_blank"
    rel="noreferrer"
    title="Donate to Wyatt!"
    className={
      linkStyles +
      " bg-red-600 rounded-md hover:bg-red-700 transition-all duration-75 ease-in-out text-gray-100 "
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
