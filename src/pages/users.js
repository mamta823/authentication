import React from "react";
import Navbar from "../components/layout/Navbar"
import UserDashboard from "../components/userdashboard";

const Users = () => {
  return (
    <div>
      <Navbar />
      <UserDashboard />
      {/* <Navbar /> */}
    </div>
  );
};

export default Users;
