import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <Image
            className="mx-auto"
            src="/static/pepe-hands.png"
            alt="404 image"
            width={200}
            height={200}
            priority
          />
          <h2 className="mt-6 text-4xl font-extrabold text-white">
            404 | Page Not Found
          </h2>
          <p className="mt-2 text-lg text-gray-400">
            Oops! The page you're looking for doesn't exist.
          </p>
        </div>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}