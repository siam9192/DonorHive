import React from "react";

const AuthProviderButtons = () => {
  return (
    <div className="md:p-5 p-3 ">
      <button className=" w-full flex  justify-center  items-center gap-2 py-2 border border-gray-400 hover:bg-gray-100">
        <img
          src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
          alt=""
          className="size-9 rounded-full "
        />
        <p className="font-semibold font-secondary">Continue With Google</p>
      </button>
      <button className=" w-full flex  justify-center  items-center gap-2 py-2 border border-gray-400  mt-2 hover:bg-gray-100">
        <img
          src="https://img.freepik.com/premium-vector/art-illustration_929495-41.jpg?semt=ais_hybrid"
          alt=""
          className="size-9 rounded-full"
        />
        <p className="font-semibold font-secondary">Continue With Google</p>
      </button>
    </div>
  );
};

export default AuthProviderButtons;
