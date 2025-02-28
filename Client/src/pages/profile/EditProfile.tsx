import React from "react";
import EditProfileForm from "../../components/forms/EditProfileForm";

const EditProfile = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Edit Your Information</h1>
      <div className="w-10/12 mx-auto mt-10">
        <EditProfileForm />
      </div>
    </div>
  );
};

export default EditProfile;
