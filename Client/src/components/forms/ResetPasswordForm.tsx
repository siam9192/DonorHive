import React from "react";

const ResetPasswordForm = () => {
  return (
    <form action="" className="p-5">
      <h1 className="md:text-3xl text-2xl font-medium">Reset password</h1>
      <div className="mt-10 space-y-3">
        <input
          type="text"
          placeholder="Password"
          className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium  outline-secondary"
        />
        <input
          type="text"
          placeholder="Confirm Password"
          className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium  outline-secondary"
        />
      </div>
      <button className="mt-5 w-full py-3 bg-primary text-white  font-medium rounded-md">
        Submit
      </button>
      <div className="mt-4">
        <p className="text-gray-700 md:text-[1rem] text-sm">
          Reset your password from here and recover your account
        </p>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
