import Link from "next/link";

type pageInfo = {
  title: string;
  description: string;
  url: string;
  emoji: string;
  image?: string;
};

const referencesData: pageInfo[] = [
  {
    title: "references",
    description: "References for games development",
    url: "/references",
    emoji: "📚",
  },
  {
    title: "works",
    description: "Voice Over Artistry Portfolio",
    url: "/works",
    emoji: "🎙️",
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
      <main className="text-center w-full">
        <div className="my-3">
          <h1 className="text-7xl text-gray-100">
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500 font-bold">
              Wyatt.gg!
            </span>
          </h1>
          <p className=" text-gray-100 text-3xl mt-2">More to come soon. 🚀</p>
          <PageInfoDisplayer pagesInfo={referencesData} />
          <ExternalPageInfoDisplayer pagesInfo={externalReferencesData} />
        </div>
      </main>
    </div>
  );
}

const PageInfoDisplayer = ({ pagesInfo }: { pagesInfo: pageInfo[] }) => {
  return (
    <div className="flex flex-col md:flex-row self-center my-10 justify-center">
      {pagesInfo.map((pageInfo) => (
        <Link href={pageInfo.url} key={pageInfo.title}>
          <a className="group border-2 rounded-md border-gray-500 p-10 my-2 hover:border-blue-300 cursor-pointer max-w-xs mx-auto md:mx-2">
            <h1 className="text-3xl text-gray-100 group-hover:text-blue-300">
              {pageInfo.emoji} {pageInfo.title.toUpperCase()}
            </h1>
            <p className="text-gray-100 group-hover:text-blue-300 text-xl">
              {pageInfo.description}
            </p>
          </a>
        </Link>
      ))}
      ;
    </div>
  );
};

const ExternalPageInfoDisplayer = ({
  pagesInfo,
}: {
  pagesInfo: pageInfo[];
}) => {
  return (
    <div className="flex my-10 flex-wrap flex-col lg:flex-row justify-center content-center">
      {pagesInfo.map((pageInfo) => (
        <a
          href={pageInfo.url}
          target={"_blank"}
          rel="noreferrer"
          key={pageInfo.title}
          className="group border-2 rounded-md border-gray-500 p-8 my-2 hover:border-blue-300 cursor-pointer max-w-xs md:mx-2 w-96 flex-none mx-auto"
        >
          <h1 className="text-2xl text-gray-100 group-hover:text-blue-300">
            {pageInfo.emoji} {pageInfo.title.toUpperCase()}
          </h1>
          <p className="text-gray-100 group-hover:text-blue-300 text-lg">
            {pageInfo.description}
          </p>
        </a>
      ))}
      ;
    </div>
  );
};
