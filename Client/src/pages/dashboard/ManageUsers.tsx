import React from "react";
import UsersSummary from "../../components/sections/Dashboard/ManageUsers/UsersSummary";
import DashboardShowUsers from "../../components/sections/Dashboard/ManageUsers/DashboardShowUsers";

const ManageUsers = () => {
  return (
    <div>
      <UsersSummary />
      <DashboardShowUsers />
    </div>
  );
};

export default ManageUsers;
