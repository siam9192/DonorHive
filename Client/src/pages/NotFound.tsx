function NotFound() {
  return (
    <div className="bg-white from-slate-200 to-gray-200 text-black">
      <div className="flex items-center justify-center min-h-screen px-2">
        <div className="text-center">
          <h1 className="text-9xl font-bold">404</h1>
          <p className="text-2xl font-medium mt-4">Oops! Page not found</p>
          <p className="mt-4 mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <a
            href="/"
            className="px-6 py-3 bg-primary text-white hover:bg-secondary font-bold font-semibold rounded-full hover:bg-purple-100 transition duration-300 ease-in-out "
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
