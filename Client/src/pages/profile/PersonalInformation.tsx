import React from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../provider/CurrentUserProvider";

const PersonalInformation = ({ editUrl }: { editUrl?: string }) => {
  const { user } = useCurrentUser();
  return (
    <div>
      <div className="md:w-10/12 w-full mx-auto">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3001/3001758.png"
          alt=""
          className="size-32 rounded-full mx-auto"
        />
        <div className="mt-10 space-y-2 font-secondary">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Full Name:</h3>
            <p className="px-2 py-3 font-medium bg-green-50 ">{user?.fullName}</p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Email Address:</h3>
            <p className="px-2 py-3 font-medium bg-green-50 ">{user?.fullName || "N/A"}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Phone Number:</h3>
            <p className="px-2 py-3 font-medium bg-green-50 ">{user?.phoneNumber || "N/A"}</p>
          </div>
          <div>
            <h1 className="text-xl font-semibold">Address:</h1>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Address Line:</h3>
                <p className="px-2 py-3 font-medium bg-green-50 ">
                  {user?.address?.street || "N/A"}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">City:</h3>
                <p className="px-2 py-3 font-medium bg-green-50 ">{user?.address?.city || "N/A"}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">State:</h3>
                <p className="px-2 py-3 font-medium bg-green-50 ">
                  {user?.address?.state || "N/A"}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Country:</h3>
                <p className="px-2 py-3 font-medium bg-green-50 ">
                  {user?.address?.country || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-5 text-center">
          <Link to={editUrl || "/profile/edit-personal-information"}>
            <button className="px-6 py-3 bg-primary text-white rounded-lg">Edit Profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
