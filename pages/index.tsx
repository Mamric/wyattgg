import Link from "next/link";
import { Card } from "../components";

type pageInfo = {
  title: string;
  description: string;
  url: string;
  emoji: string;
  image?: string;
};

const referencesData: pageInfo[] = [
  {
    title: "works",
    description: "Voice Over Artistry Portfolio",
    url: "/works",
    emoji: "🎙️",
  },
  {
    title: "references",
    description: "References for games development",
    url: "/references",
    emoji: "📚",
  },
];

const externalReferencesData: pageInfo[] = [
  {
    title: "youtube",
    description: "The main YouTube channel",
    url: "//youtube.com/scpWyatt",
    emoji: "📺",
  },
  {
    title: "discord",
    description: "The official discord server",
    url: "//discord.gg/scpWyatt",
    emoji: "👥",
  },
  {
    title: "reddit",
    description: "oh god don't go here",
    url: "//reddit.com/r/scpWyatt2",
    emoji: "📰",
  },
];

export default function Home() {
  return (
    <div>
      <main className="text-center w-full select-none">
        <div className="mt-3">
          <div className="flex justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl md:w-full w-3/5 font-bold transition-all duration-150">
              Welcome to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500 font-bold">
                Wyatt.gg!
              </span>
            </h1>
          </div>
          <p className="font-semibold text-3xl mt-2">More to come soon. 🚀</p>
          <PageInfoDisplayer pagesInfo={referencesData} />
          <div className="flex justify-center">
            <ExternalPageInfoDisplayer pagesInfo={externalReferencesData} />
          </div>
        </div>
      </main>
    </div>
  );
}

const PageInfoDisplayer = ({ pagesInfo }: { pagesInfo: pageInfo[] }) => {
  return (
    <div className="flex flex-col md:flex-row self-center my-10 justify-center">
      {pagesInfo.map((pageInfo, i) => (
        <Card {...pageInfo} index={i} key={i} />
      ))}
    </div>
  );
};

const ExternalPageInfoDisplayer = ({
  pagesInfo,
}: {
  pagesInfo: pageInfo[];
}) => {
  return (
    <div className="flex mt-10 flex-wrap flex-col md:flex-row justify-center content-center border-2 rounded-md shadow-md w-11/12">
      {pagesInfo.map((pageInfo) => (
        <a
          href={pageInfo.url}
          target={"_blank"}
          rel="noreferrer"
          key={pageInfo.title}
          className="group rounded-md w-48 py-4 px-0 my-2 hover:bg-gray-50 cursor-pointer max-w-xs md:mx-2 lg:p-8 lg:w-64 xl:w-72 transition-all duration-150"
        >
          <h2 className="text-xl xl:text-2xl font-bold">
            {/* {pageInfo.emoji} */}
            {pageInfo.title.toUpperCase()}
          </h2>
          <p className="text-md xl:text-lg">{pageInfo.description}</p>
        </a>
      ))}
    </div>
  );
};
