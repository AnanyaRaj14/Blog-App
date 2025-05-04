import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-white dark:bg-gray-900 px-4">
      <h1 className="text-7xl font-extrabold text-blue-600 mb-4">404</h1>
      <p className="text-2xl text-gray-800 dark:text-gray-200 mb-6 max-w-xl">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 transition-colors duration-300"
        aria-label="Go back to homepage"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
