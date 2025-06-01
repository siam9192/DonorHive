import React, { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { GoBlocked } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import {
  useChangeUserStatusMutation,
  useDeleteUserMutation,
  useGetUserForManageQuery,
} from "../../redux/features/user/user.api";
import { EUserStatus } from "../../types/user.type";
import ConfirmPopup from "../popup/ConfirmPopup";
import { toast } from "sonner";
interface IProps {
  id: string;
  closePopup?: () => void;
}
const UserDetails = ({ id, closePopup }: IProps) => {
  const { data, isLoading } = useGetUserForManageQuery(id);

  const user = data?.data;
  const [status, setStatus] = useState(user?.status);
  const [changeStatus] = useChangeUserStatusMutation();
  const [deleteUser] = useDeleteUserMutation();
  if (isLoading) return <p>Loading..</p>;
  if (!user) return <p>Something went wrong..</p>;

  const defaultVal = "N/A";

  const handelChangeStatus = async (status: EUserStatus.Active | EUserStatus.Blocked) => {
    try {
      const res = await changeStatus({ id, payload: { status } });
      if (res.data.success) {
        toast.success(`User ${status}  successfully`);
        setStatus(status);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handelDeleteUser = async () => {
    try {
      const res = await deleteUser(id);
      if (res.data.success) {
        toast.success(`User deleted successfully`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    closePopup && closePopup();
  };

  return (
    <div>
      {" "}
      <h1 className="text-2xl font-medium text-gray-800">User Details</h1>
      <div className="mt-8">
        <div>
          <img src={user.profilePhotoUrl} alt="" className="size-28 rounded-full mx-auto" />
          <h1 className="mt-2 text-xl font-medium text-center text-gray-950">
            {user.fullName} <span className="text-primary">({user.role})</span>
          </h1>
        </div>

        <div className="mt-4">
          <h2 className="text-gray-900 font-medium text-xl">Personal Information:</h2>
          <div className="mt-3 space-y-3 font-secondary">
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Full Name:</span>
              <span>{user.fullName}</span>
            </p>
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Email Address:</span>
              <span>{user.email || defaultVal}</span>
            </p>
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Phone Number:</span>
              <span>{user.phoneNumber || defaultVal}</span>
            </p>
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Address:</span>
              <span>{user.address ? Object.values(user.address).join(",") : defaultVal}</span>
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-gray-900 font-medium text-xl">Account Information:</h2>
          <div className="mt-3 space-y-3 font-secondary">
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Role:</span>
              <span className="rounded-md   text-primary font-medium">{user.role}</span>
            </p>
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Provider:</span>
              <span className="px-2 py-1 rounded-md  bg-blue-100 text-blue-700 font-medium">
                {user.provider}
              </span>
            </p>

            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Status:</span>
              <span
                className={`${user.status === EUserStatus.Active ? "text-primary" : "text-red-500"} font-medium `}
              >
                {user.status}
              </span>
            </p>
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Created At:</span>
              <span>
                {new Date(user.createdAt).toDateString()}-
                {new Date(user.createdAt).toLocaleTimeString()}
              </span>
            </p>
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Updated At:</span>
              <span>
                {new Date(user.updatedAt).toDateString()}-
                {new Date(user.updatedAt).toLocaleTimeString()}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-end items-center gap-2">
        <ConfirmPopup onConfirm={() => handelDeleteUser} heading={`Delete ${user.fullName}`}>
          <button className="p-2 bg-gray-100 rounded-full text-2xl text-red-700">
            <IoTrashOutline />
          </button>
        </ConfirmPopup>
        {(status || user.status) === EUserStatus.Active && (
          <button
            onClick={() => handelChangeStatus(EUserStatus.Blocked)}
            className="p-2 bg-gray-100 rounded-full text-2xl text-pink-700"
          >
            <GoBlocked />
          </button>
        )}
        {(status || user.status) === EUserStatus.Blocked && (
          <button
            onClick={() => handelChangeStatus(EUserStatus.Active)}
            className="p-2 bg-gray-100 rounded-full text-2xl text-primary"
          >
            <FaCheck />
          </button>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
