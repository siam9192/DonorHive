import React from "react";
import DonationDetailsPopup from "../ui/DonationDetailsPopup";

const ManageDonationTableCard = () => {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
      <td className="px-6 py-4 font-medium  whitespace-nowrap dark:text-white text-lg text-primary">
        $120
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="flex items-center gap-1">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XFuagoooyrO-tLqJJPdX-5aLDPg9kOvC3w&s"
            alt=""
            className="size-12"
          />
          <h3>Apple MacBook Pro 17</h3>
        </div>
      </th>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <div className="flex items-center gap-2">
          <img src="/images/default-profile.png" alt="" className="size-10 rounded-full" />
          <h4>John Doe</h4>
        </div>
      </td>
      <td className="px-6 py-4">PAID</td>
      <td className="px-6 py-4">$2999</td>
      <td className="px-6 py-4">$2999</td>
      <td className="px-6 py-4 space-x-4">
        <DonationDetailsPopup>
          <button className="text-primary font-medium">Details</button>
        </DonationDetailsPopup>
        <button className="text-red-500 font-medium">Refund</button>
      </td>
    </tr>
  );
};

export default ManageDonationTableCard;
