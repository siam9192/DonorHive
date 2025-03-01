import React from "react";

const UserCard = () => {
  return (
    <div className=" mt-3 p-5 border-2 border-gray-600/15 rounded-md relative">
      <div className="flex items-center gap-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3001/3001758.png"
          alt=""
          className="md:size-16 size-12 rounded-full"
        />
        <div className="font-secondary">
          <h3 className="md:text-xl text-lg font-medium text-gray-900">John Doe</h3>
          <p className="text-gray-500 text-sm ">john@gmail.com</p>
        </div>
      </div>
      <div className="flex justify-end items-center gap-2">
        <button className="text-primary font-medium text-sm ">Details</button>
      </div>
      <p className="text-sm font-medium text-gray-600 absolute top-2 right-2 ">1 hours ago</p>
    </div>
  );
};

export default UserCard;
