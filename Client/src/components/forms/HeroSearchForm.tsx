const HeroSearchForm = () => {
  return (
    <div className="md:p-10 p-5 bg-white  h-full rounded-md">
      <h1 className="text-3xl font-bold text-black font-primary">
        Become a volunteer <br />
        to help helpless
      </h1>
      <div className="mt-5 space-y-3">
        <input
          type="text"
          className="w-full px-2 py-3 border-2 border-gray-200 rounded-lg  bg-transparent placeholder:font-medium placeholder:font-secondary outline-secondary"
          placeholder="Full Name"
        />
        <input
          type="text"
          className="w-full px-2 py-3 border-2 border-gray-200 rounded-lg  bg-transparent placeholder:font-medium placeholder:font-secondary  outline-secondary"
          placeholder="Email Address"
        />
        <input
          type="text"
          className="w-full px-2 py-3 border-2 border-gray-200 rounded-lg  bg- placeholder:font-medium placeholder:font-secondary  outline-secondary"
          placeholder="Phone Number"
        />
        <textarea
          className="w-full px-2 py-3 h-40 resize-none border-2 border-gray-200 rounded-lg  bg-transparent placeholder:font-medium placeholder:font-secondary  outline-secondary"
          placeholder="Message"
        />
      </div>
      <div className="mt-5">
        <button className="px-8 py-3 rounded-md bg-secondary hover:bg-gray-900 hover:text-white text-gray-900">
          Submit
        </button>
      </div>
    </div>
  );
};

export default HeroSearchForm;
