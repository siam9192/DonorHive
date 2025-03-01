import { FaDonate } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <div className="size-fit mx-auto md:text-9xl text-8xl p-5 bg-primary text-white rounded-xl  animate-pulse ">
          <FaDonate />
        </div>
        <h1 className="text-2xl   font-semibold mt-2 text-center text-gray-700">DonorHive</h1>
      </div>
    </div>
  );
};

export default Loading;
