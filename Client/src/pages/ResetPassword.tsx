import React from "react";
import ResetPasswordForm from "../components/forms/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="lg:w-1/3 md:w-1/2 w-10/12  border-2 rounded-md border-gray-600/15">
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPassword;
