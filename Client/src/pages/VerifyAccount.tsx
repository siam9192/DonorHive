import React from "react";
import { Link, useParams } from "react-router-dom";
import { useVerifyRegistrationMutation } from "../redux/features/auth/auth.api";

const VerifyAccount = () => {
  const { token } = useParams();
  const [confirm, { isLoading, isSuccess, error }] = useVerifyRegistrationMutation();
  const handelConfirm = async () => {
    await confirm(token);
  };
  return (
    <div className="h-screen flex justify-center items-center">
      {!isSuccess ? (
        <div className="lg:w-1/3 md:w-1/2 w-10/12 lg:p-10 p-5 border-2 rounded-md border-gray-600/15">
          <h1 className="md:text-3xl text-2xl font-medium">Confirm your account</h1>
          <div className="mt-10">
            <button
              disabled={isLoading}
              onClick={handelConfirm}
              className="w-full py-3 bg-primary text-white rounded-md"
            >
              Confirm
            </button>
            <button
              disabled={isLoading}
              className="mt-3 w-full py-3  hover:bg-red-500 hover:text-white hover:border-none border-2 border-gray-700/30 rounded-md"
            >
              Cancel
            </button>
          </div>
          <div className="mt-4">
            <p className="text-gray-700 md:text-[1rem] text-sm">
              "Clicking 'Confirm' will successfully create your account." or "Clicking 'Cancel' will
              discard your account creation request."
            </p>
            {error && (
              <p className="mt-2 text-red-500">
                {(error as any)?.data?.message || "Something went wrong"}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="lg:w-1/3 md:w-1/2 w-10/12 lg:p-10 p-5 border-2 rounded-md border-gray-600/15">
          <img src="/images/registration-success.jpg" alt="" className="w-1/2 mx-auto" />
          <h1 className="text-center mt-3 text-2xl font-medium">
            Your account successfully created
          </h1>
          <div className="mt-3 text-center">
            <Link to={"/"} replace={true}>
              <button className="px-4 py-2 bg-primary text-white rounded-md">Go Home</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyAccount;
