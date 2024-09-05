'use client';

import { useState } from 'react';
import Link from "next/link";
import { ClientSideNav } from "./ClientSideNav";

type NavLink = { url: string; text: string; };

const navLinks: NavLink[] = [
  { url: "/", text: "Home" },
  { url: "/works", text: "Works" },
  { url: "/references", text: "References" },
];

const externalLinks: NavLink[] = [
  { url: "https://youtube.com/scpWyatt", text: "YouTube" },
  { url: "https://discord.gg/scpWyatt", text: "Discord" },
  { url: "https://reddit.com/r/scpWyatt2", text: "Reddit" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="font-display text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Wyatt.gg
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <ClientSideNav navLinks={navLinks} externalLinks={externalLinks} />
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <ClientSideNav navLinks={navLinks} externalLinks={externalLinks} mobile={true} />
      </div>
    </header>
  );
};