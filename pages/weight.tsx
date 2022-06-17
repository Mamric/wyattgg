const weightPage = () => {
    interface entry {
        date: string,
        weight: number
    }

    const entries: Array<entry> = [
        {
            date: "June 16, 2022",
            weight: 288.8,
        },
    ]

    return (
        <div className="text-center text-white my-8">
            <div className="text-5xl">My Weight</div>
            <div className="text-1xl italic mt-2">A Gamer&apos;s Journey</div>
            <div className="my-4 text-center md:text-left flex flex-wrap justify-evenly">
                {entries.map((entry, i) => (
                    <div key={i} className="my-5 flex-none w-7/12">
                        <div className="text-3xl font-bold">Entry {i + 1}:</div>
                        <div className="">
                            {new Date(entry.date).toLocaleString('en-us', { weekday: 'long' })}
                        </div>
                        <div className="text-xs">
                            {entry.date}
                        </div>
                        <div className="mt-2">Weight: {" "}
                            <div className="text-xl font-bold inline-block">
                                {entry.weight}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default weightPage