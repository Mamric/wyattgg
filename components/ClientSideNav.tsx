'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = { url: string; text: string; icon?: React.ComponentType<{ className?: string }> };

export const ClientSideNav = ({ navLinks, externalLinks, mobile = false }: { navLinks: NavLink[], externalLinks: NavLink[], mobile?: boolean }) => {
  const pathname = usePathname();

  const linkClasses = mobile
    ? "block px-3 py-2 rounded-md text-base font-medium"
    : "px-3 py-2 rounded-md text-sm font-medium";

  const activeLinkClasses = "bg-gray-800 text-white";
  const inactiveLinkClasses = "text-gray-300 hover:bg-gray-700 hover:text-white";
  const externalLinkClasses = "text-gray-400 hover:text-gray-200 text-sm font-normal";

  return (
    <nav className={mobile ? "px-2 pt-2 pb-3 space-y-1" : "flex items-center space-x-4"}>
      {navLinks.map((link) => (
        <Link
          key={link.url}
          href={link.url}
          className={`${linkClasses} ${
            pathname === link.url ? activeLinkClasses : inactiveLinkClasses
          }`}
        >
          {link.text}
        </Link>
      ))}
      {!mobile && <span className="text-gray-500">|</span>}
      <div className={mobile ? "mt-4 pt-4 border-t border-gray-700" : "flex space-x-4"}>
        {externalLinks.map((link) => (
          <a
            key={link.url}
            href={link.url}
            className={`${linkClasses} ${externalLinkClasses} flex items-center`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.icon ? (
              <link.icon className="h-5 w-5" />
            ) : (
              link.text
            )}
            <span className="sr-only">{link.text}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};