// app/not-found.jsx

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center lg:py-30 py-10 ">
      {/* 404 with top-to-bottom and bottom-to-top animation */}
      <h4 className="text-[8rem] font-extrabold text-rose-500 leading-none animate-slideUpDownRepeat">
        404
      </h4>
      <h1 className="text-3xl md:text-4xl font-bold mt-8 lg:mt-10 text-gray-800 dark:text-white">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-500 mt-2 max-w-lg">
        Looks like you took a wrong turn. Don’t worry, even the best travelers
        lose their way sometimes.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-rose-500 text-white rounded-lg shadow-lg hover:bg-rose-600 hover:shadow-red-400 transition-all duration-300"
      >
        Back to Home
      </a>
    </div>
  );
}
