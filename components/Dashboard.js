import { Button } from "@mui/material";
import React from "react";

const DashBoard = ({ name = "", email = "" }) => {
  const Logout = () => {
    localStorage.removeItem("islogin");
    window.location.reload();
  };
  return (
    <div>
      <h1 className="text-green-300 text-center capitalize">{name}</h1>
      <p className="text-gray-500 text-center">{email}</p>
      <Button
        onClick={Logout}
        className="bg-red-400 text-white"
        color="secondary"
      >
        Logout
      </Button>
    </div>
  );
};

export default DashBoard;
