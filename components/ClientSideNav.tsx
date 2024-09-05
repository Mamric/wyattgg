'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = { url: string; text: string; };

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
            {link.text}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
        ))}
      </div>
    </nav>
  );
};