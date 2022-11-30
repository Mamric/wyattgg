import React from "react";

type reference = {
  name: string;
  url: string;
  mediaType: "video" | "article" | "powerpoint" | "other";
  description: string;
};

const referencesData: reference[] = [
  {
    name: "AI Part 1",
    url: "https://www.gamedeveloper.com/programming/gdc-2005-proceeding-handling-complexity-in-the-i-halo-2-i-ai",
    mediaType: "article",
    description: "GDC 2005 Proceeding: Handling Complexity in the Halo 2 AI",
  },
  {
    name: "AI Part 2",
    url: "https://www.youtube.com/watch?v=kda7rz5qFtI",
    mediaType: "video",
    description: "The AI of Halo 1 Combat Evolved | Design and Implementation",
  },
  {
    name: "AI Part 3",
    url: "https://medium.com/the-cube/theaiofhalo2-33e824209a4c",
    mediaType: "article",
    description: "Outsmarting The Covenant: The AI of Halo 2",
  },
  {
    name: "AI Part 4",
    url: "https://www.gamedeveloper.com/pc/in-depth-bungie-on-eight-years-of-i-halo-i-ai",
    mediaType: "article",
    description: "In-Depth: Bungie on Eight Years of Halo AI",
  },
  {
    name: "Visual Arts & Shading Part 1",
    url: "https://www.gdcvault.com/play/1012264/Shading-a-Bigger-Better-Sequel",
    mediaType: "video",
    description: "Shading a Bigger, Better Sequel: Techniques in Left 4 Dead 2",
  },
  {
    name: "Visual Arts & Shading Part 2",
    url: "http://alex.vlachos.com/graphics/Vlachos-GDC10-Left4Dead2Wounds.pdf",
    mediaType: "powerpoint",
    description: "Rendering Wounds in Left 4 Dead 2",
  },
];

const pageQuote = "The only true wisdom is in knowing you know nothing.";
const pageQuoteAuthor = "Socrates";

const referencesPage = () => {
  return (
    <div className="flex flex-col flex-w items-center select-none">
      <div className="w-11/12">
        <div className="font-bold mt-5 text-5xl text-center md:text-left">
          REFERENCES
        </div>
        <div className="m-5 text-center md:text-left">
          <span className="italic">{`"${pageQuote}"`}</span>{" "}
          {`- ${pageQuoteAuthor}`}
        </div>
        <div className="border-l-4 pl-4">
          Below is a running list of game development resources that I have
          collected over the years. The intention for this list is to inspire
          independent game developers and to give them a few pointers from those
          that came before them. It is far from a complete list, and I intend to
          add onto it as time progresses, and as I find more articles and
          resources that I find useful.
        </div>
      </div>
      <div className="flex flex-col items-center mt-10 w-11/12 p-10 pt-5 border rounded-md shadow-md">
        {referencesData.map((r) => (
          <div
            key={r.name}
            className="my-2 w-full hover:bg-gray-100 rounded-md p-3 transition-all duration-150 "
          >
            <div className="text-left font-bold text-3xl select-none">
              {r.name.toUpperCase()}
            </div>
            <div className="select-none">{r.description}</div>
            <div className="text-center select-none">
              <a
                href={r.url}
                className="border-b-2 border-transparent hover:border-blue-400 text-blue-600 hover:text-blue-800 visited:text-purple-600"
                target="_blank"
                rel="noreferrer"
              >
                {r.mediaType === "article"
                  ? "Read Article"
                  : r.mediaType === "video"
                  ? "Watch Video"
                  : r.mediaType === "powerpoint"
                  ? "View Presentation"
                  : ""}{" "}
                ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default referencesPage;
