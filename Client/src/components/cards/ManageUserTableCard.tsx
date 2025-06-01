import React, { use } from "react";
import UserDetailsPopup from "../ui/UserDetailsPopup";
import { EUserStatus, IUser } from "../../types/user.type";
import ConfirmPopup from "../popup/ConfirmPopup";
import { useDeleteUserMutation } from "../../redux/features/user/user.api";
import { toast } from "sonner";

interface IProps {
  user: IUser;
}

const ManageUserTableCard = ({ user }: IProps) => {
  const createdAt = new Date(user.createdAt);
  const [deleteUser] = useDeleteUserMutation();
  const handelDeleteUser = async () => {
    try {
      const res = await deleteUser(user._id);
      if (res.data.success) {
        toast.success(`User deleted successfully`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <tr className="odd:bg-white  even:bg-gray-50  border-b  border-gray-200">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="flex items-center gap-1">
          <img src={user.profilePhotoUrl} alt="" className="size-12" />
          <h3 className="text-black">{user.fullName}</h3>
        </div>
      </th>
      <td className="px-6 py-4">{user.email}</td>
      <td className="px-6 py-4">
        <p className="p-2 bg-blue-50 w-fit text-blue-700 rounded-full">
          {user.provider.replace("-", " ")}
        </p>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1">
          <div
            className={`size-2 rounded-full ${user.status === EUserStatus.Active ? "bg-primary" : "bg-red-500"} `}
          ></div>
          <p className="font-medium">{user.status}</p>
        </div>
      </td>

      <td className="px-6 py-4">
        {createdAt.toDateString()}-{createdAt.toLocaleTimeString()}
      </td>
      <td className="px-6 py-4">
        {createdAt.toDateString()}-{createdAt.toLocaleTimeString()}
      </td>
      <td className="px-6 py-4 space-x-4">
        <UserDetailsPopup id={user._id}>
          <button className="text-primary font-medium">Details</button>
        </UserDetailsPopup>
        <ConfirmPopup onConfirm={handelDeleteUser} heading={`Delete ${user.fullName}`}>
          <button className="text-red-500 font-medium">Delete</button>
        </ConfirmPopup>
      </td>
    </tr>
  );
};

export default ManageUserTableCard;
