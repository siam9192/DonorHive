import { IoCheckmarkDoneOutline } from "react-icons/io5";

const DonationSuccessful = () => {
  return (
    <div className="h-[85vh] flex flex-col gap-2 justify-center items-center">
      <img src="/images/donation-success.jpg" alt="" className="h-1/2 mx-auto" />
      <div className="flex items-center gap-2">
        <span className="text-3xl font-medium   text-primary p-3  rounded-full">
          <IoCheckmarkDoneOutline />
        </span>
        <h1 className="text-3xl font-semibold font-secondary">Donation Successful</h1>
      </div>
      <p>Thanks for your love</p>
      <div className="flex items-center gap-2">
        <button className="px-6 py-3  border-2 rounded-md hover:bg-secondary">Back Home</button>
        <button className="px-6 py-3  border-2 rounded-md hover:bg-secondary">My Donations</button>
      </div>
    </div>
  );
};

export default DonationSuccessful;
