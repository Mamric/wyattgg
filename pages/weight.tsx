import Head from "next/head";

interface entry {
  date: string;
  weight: number;
}

const entries: Array<entry> = [
  {
    date: "June 16, 2022",
    weight: 288.8,
  },
  {
    date: "June 17, 2022",
    weight: 284.4,
  },
  {
    date: "June 18, 2022",
    weight: 283.7,
  },
];

const weightPage = () => {
  return (
    <div>
      <Head>
        <meta name="description" content="Wyatt's Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-center text-white my-8">
        <div className="text-left px-7 md:text-center">
          <div className="text-5xl">My Weight</div>
          <div className="text-1xl italic mt-2">A Gamer&apos;s Journey</div>
        </div>
        <div className="my-4 text-center md:text-left flex flex-wrap justify-evenly max-w-6xl mx-auto lg:w-lg">
          {entries.map((entry, i) => (
            <div key={i} className="my-5 flex-none w-7/12">
              <div className="text-3xl font-bold">Entry {i + 1}:</div>
              <div className="">
                <i>
                  {new Date(entry.date).toLocaleString("en-us", {
                    weekday: "long",
                  })}
                </i>
              </div>
              <div className="text-xs">{entry.date}</div>
              <div className="mt-2">
                Weight:{" "}
                <div className="text-xl font-bold inline-block">
                  {entry.weight}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default weightPage;
