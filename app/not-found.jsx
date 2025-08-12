// app/not-found.jsx

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white px-4">
      <h1 className="text-9xl font-extrabold drop-shadow-lg mb-6">404</h1>
      <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
        Oops! Page Not Found
      </h2>
      <p className="max-w-md text-center mb-8 text-lg">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-white text-red-500 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition"
      >
        Go Back Home
      </Link>
    </main>
  );
}
