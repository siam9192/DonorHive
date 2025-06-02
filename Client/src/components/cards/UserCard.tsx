import React from "react";
import { IUser } from "../../types/user.type";
import { getTimeAgo } from "../../utils/function";
interface IProps {
  user: IUser;
}
const UserCard = (props: IProps) => {
  const user = props.user;
  return (
    <div className=" mt-3 p-5 border-2 border-gray-600/15 rounded-md relative">
      <div className="flex items-center gap-2">
        <img
          src={user.profilePhotoUrl || "https://cdn-icons-png.flaticon.com/512/3001/3001758.png"}
          alt=""
          className="md:size-16 size-12 rounded-full"
        />
        <div className="font-secondary">
          <h3 className="md:text-xl text-lg font-medium text-gray-900">{user.fullName}</h3>
          <p className="text-gray-500 text-sm ">{user.email}</p>
        </div>
      </div>
      <div className="flex justify-end items-center gap-2">
        <button className="text-primary font-medium text-sm ">Details</button>
      </div>
      <p className="text-sm font-medium text-gray-600 absolute top-2 right-2 ">
        {getTimeAgo(user.createdAt)} ago
      </p>
    </div>
  );
};

export default UserCard;
