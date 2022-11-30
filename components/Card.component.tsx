import Link from "next/link";

interface ICardProps {
  title: string;
  description: string;
  url: string;
  emoji: string;
  image?: string;
  externalLink?: boolean;
}
export const Card = ({
  title,
  description,
  url,
  emoji,
  image,
  externalLink,
}: ICardProps) => {
  return (
    <Link href={url} key={title}>
      <a
        className="group border-2 rounded-md border-gray-200 p-10 my-2 cursor-pointer max-w-xs mx-auto md:mx-2 shadow-md text-left hover:bg-gray-50 transition-all duration-150"
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
