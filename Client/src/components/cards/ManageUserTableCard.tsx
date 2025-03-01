import React from "react";
import UserDetailsPopup from "../ui/UserDetailsPopup";

const ManageUserTableCard = () => {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="flex items-center gap-1">
          <img src="/images/default-profile.png" alt="" className="size-12" />
          <h3>John Doe</h3>
        </div>
      </th>
      <td className="px-6 py-4">doe66@mail.com</td>
      <td className="px-6 py-4">
        <p className="p-2 bg-blue-50 w-fit text-blue-700 rounded-full">Facebook</p>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1">
          <div className="size-2 rounded-full bg-red-500"></div>
          <p className="font-medium">Blocked</p>
        </div>
      </td>

      <td className="px-6 py-4">
        {new Date().toDateString()}-{new Date().toLocaleTimeString()}
      </td>
      <td className="px-6 py-4">
        {new Date().toDateString()}-{new Date().toLocaleTimeString()}
      </td>
      <td className="px-6 py-4 space-x-4">
        <UserDetailsPopup>
          <button className="text-primary font-medium">Details</button>
        </UserDetailsPopup>
        <button className="text-red-500 font-medium">Delete</button>
      </td>
    </tr>
  );
};

export default ManageUserTableCard;
