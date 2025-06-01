import React from "react";

const Setting = () => {

  return <p>Will be available soon</p>
  return (
    <div>
      <h1 className="text-3xl text-black font-medium">Account Setting</h1>
      <div className="mt-10  space-y-2">
        <button className="text-primary font-medium block">Change Password</button>
        <button className="text-primary font-medium block">Forget Password</button>
        <button className="text-red-400 font-medium block">Delete Account</button>
      </div>
    </div>
  );
};

export default Setting;
