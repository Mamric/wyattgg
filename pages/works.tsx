import React from "react";

type work = {
  name: string;
  url: string;
  mediaType: "video";
  description: string;
  attributions: string;
};

const worksData: work[] = [
  {
    name: "Order Your Ghostlight Now!",
    url: "https://www.youtube.com/watch?v=QeSmUl9YBSg",
    mediaType: "video",
    description: "A teaser trailer for SCP: Secret Laboratory's Ghostlight update.",
    attributions: "Theo (Presenter)",
  },
  {
    name: "Mimicry - SCP-939 Reveal Trailer",
    url: "https://www.youtube.com/watch?v=L2k7dQnKUMw",
    mediaType: "video",
    description: "A trailer for SCP: Secret Laboratory's Patch 12.0 update",
    attributions: "MTF 4"
  }
];

const pageQuote = "You are what you do, not what you say you'll do.";
const pageQuoteAuthor = "Carl Jung";

const worksPage = () => {
  return (
    <main className="text-white flex flex-col flex-w items-center px-3">
      <div className="text-white flex flex-col flex-w items-center px-3">
        <div className="text-center text-bold mt-5 text-5xl">WORKS</div>
      </div>
      <div>
        <div className="m-5 text-center">
          <span className="italic">{`"${pageQuote}"`}</span>{" "}
          {`- ${pageQuoteAuthor}`}
        </div>
        <div className="max-w-xl">
          Below is a list of works that I have leant my voice to. As I continue
          to work on more projects, I will update this page with more
          information, and with additional sections. But for now, I hope you
          enjoy the works that I have been a part of.
        </div>
        <div className="flex flex-col items-center my-10 p-10 pt-5 border rounded-md">
          {worksData.map((r) => (
            <div key={r.name} className="mt-5 w-full">
              <div className="text-left font-bold text-3xl">{r.name}</div>
              <div className="italic">{r.description}</div>
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
              <div>
                Played: <span className="italic">{r.attributions}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default worksPage;
