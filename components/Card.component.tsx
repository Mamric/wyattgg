import Link from "next/link";

type ICardProps = {
  title: string;
  description: string;
  url: string;
  emoji: string;
  index: number;
  image?: string;
  externalLink?: boolean;
};
export const Card = ({
  title,
  description,
  url,
  index,
  emoji,
  image,
  externalLink,
}: ICardProps) => {
  return (
    <Link href={url}>
      <a
        className={
          (index === 0
            ? "shadow-lg "
            : "") +
          "group border-2 rounded-md border-gray-200 p-10 my-2 cursor-pointer max-w-xs mx-auto md:mx-2 shadow-md text-left hover:bg-gray-50 hover:shadow-lg transition-all duration-150"
        }
        target={externalLink ? "_blank" : "_self"}
      >
        <h1 className="text-3xl font-bold">
          {/* {emoji}  */}
          {title.toUpperCase()}
        </h1>
        <p className="text-xl">{description}</p>
      </a>
    </Link>
  );
};
