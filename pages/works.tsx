import React from "react";

// define the works data
type work = {
  name: string;
  url: string;
  mediaType: "video";
  description: string;
  attributions: string;
};

// object containing the works data
const worksData: work[] = [
  {
    name: "Order Your Ghostlight Now!",
    url: "https://www.youtube.com/watch?v=QeSmUl9YBSg",
    mediaType: "video",
    description:
      "A teaser trailer for SCP: Secret Laboratory's Ghostlight update",
    attributions: "Theo (Presenter)",
  },
  {
    name: "Mimicry - SCP-939 Reveal Trailer",
    url: "https://www.youtube.com/watch?v=L2k7dQnKUMw",
    mediaType: "video",
    description: "A trailer for SCP: Secret Laboratory's Patch 12.0 update",
    attributions: "MTF 4",
  },

  {
    name: "SCP Secret Laboratory in REALITY Animated | part 2",
    url: "https://www.youtube.com/watch?v=4_EdJXAuKeM",
    mediaType: "video",
    description: "Just your average day in SCP: Secret Laboratory",
    attributions: "SCP-049",
  },
];

const pageQuote = "You are what you do, not what you say you'll do.";
const pageQuoteAuthor = "Carl Jung";

const worksPage = () => {
  return (
    <main className="flex flex-col flex-w items-center">
      <div className="w-9/12">
        <div className="mt-5 text-5xl text-center md:text-left">WORKS</div>
        <div>
          <div className="m-5 text-center md:text-left">
            <span className="italic">{`"${pageQuote}"`}</span>{" "}
            {`- ${pageQuoteAuthor}`}
          </div>
          <div className="">
            Below is a list of works that I have leant my voice to. As I
            continue to work on more projects, I will update this page with more
            information, and with additional sections. But for now, I hope you
            enjoy the works that I have been a part of.
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-10 w-11/12 p-10 pt-5 border rounded-md shadow-md">
        {worksData
          .map((r) => (
            <div key={r.name} className="my-5 w-full">
              <div className="text-left font-bold text-3xl">{r.name}</div>
              <div className="">{r.description}</div>
              <div>
                Played: <span className="italic">{r.attributions}</span>
              </div>
              <div className="text-center">
                <a
                  href={r.url}
                  className="hover:underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                  target="_blank"
                  rel="noreferrer"
                >
                  {r.mediaType === "video" ? "Watch Video" : ""} ↗
                </a>
              </div>
            </div>
          ))
          .reverse()}
        {/*Reverse the order of the works so most recent is on top*/}
      </div>
    </main>
  );
};

export default worksPage;
