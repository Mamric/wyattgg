import React from "react";

type reference = {
  name: string;
  url: string;
  mediaType: "video" | "article" | "powerpoint" | "other";
  description: string;
};

const referencesData: reference[] = [
  {
    name: "AI part 1",
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

const referencesPage = () => {
  return (
    <div className="text-white flex flex-col flex-w items-center">
      <div className="text-center text-bold mt-5 text-5xl">REFERENCES</div>
      <div className="m-5">
        <span className="italic">
          "The only true wisdom is in knowing you know nothing"
        </span>{" "}
        - Socrates
      </div>
      <div className="max-w-xl">
        Below is a running list of game development resources that I have
        collected over the years. The intention for this list is to inspire
        independent game developers and to give them a few pointers from those
        that came before them. It is far from a complete list, and I intend to
        add onto it as time progresses, and as I find more articles and
        resources that I find useful.
      </div>
      <div className="flex flex-col items-center my-10 p-10 pt-5 border rounded-md">
        {referencesData.map((r) => (
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
