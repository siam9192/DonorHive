import React from "react";
import { MdModeEdit } from "react-icons/md";

const EditProfileForm = () => {
  return (
    <form action="">
      <div>
        <div className="md:w-10/12 w-full mx-auto">
          <div className="relative w-fit size-32 mx-auto">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3001/3001758.png"
              alt=""
              className="size-32 rounded-full "
            />
            <button className="text-xl text-white p-2 bg-primary rounded-full absolute bottom-0 -right-1">
              <MdModeEdit />
            </button>
          </div>
          <div className="mt-10 space-y-2 font-secondary">
            <div className="space-y-2">
              <label className="text-lg font-medium block">Full Name:</label>
              <input
                defaultValue="John Doe"
                className="px-2 py-3 font-medium bg-green-50  w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-lg font-medium block">Email Address:</label>
              <input
                defaultValue="John Doe"
                className="px-2 py-3 font-medium bg-green-50  w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-lg font-medium block">Phone Number:</label>
              <input
                defaultValue="John Doe"
                className="px-2 py-3 font-medium bg-green-50  w-full"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Address:</h1>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-lg font-medium block">Line:</label>
                  <input
                    defaultValue="John Doe"
                    className="px-2 py-3 font-medium bg-green-50  w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-lg font-medium block">State:</label>
                  <input
                    defaultValue="John Doe"
                    className="px-2 py-3 font-medium bg-green-50  w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-lg font-medium block">Country:</label>
                  <input
                    defaultValue="John Doe"
                    className="px-2 py-3 font-medium bg-green-50  w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" mt-5 text-end ">
            <button className="px-6 py-3 bg-primary hover:bg-secondary text-white rounded-lg">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;
