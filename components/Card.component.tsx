import Link from "next/link";

type CardProps = {
  title: string;
  description: string;
  url: string;
  emoji: string;
  externalLink?: boolean;
};

export const Card = ({ title, description, url, emoji, externalLink }: CardProps) => {
  return (
    <Link
      href={url}
      className="group flex flex-col justify-between bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      target={externalLink ? "_blank" : "_self"}
      rel={externalLink ? "noopener noreferrer" : ""}
    >
      <div>
        <div className="flex items-center mb-3">
          <span className="text-3xl mr-3">{emoji}</span>
          <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h2>
        </div>
        <p className="text-gray-300 mb-4">{description}</p>
      </div>
      <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
        {externalLink ? "Visit →" : "Learn More →"}
      </div>
    </Link>
  );
};