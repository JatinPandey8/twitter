import { Button } from "@mui/material";

import React from "react";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const UserCard = ({ user }) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(`/profile/${user.id}`);
  };

  return (
    <div
      className="flex items-center space-x-4 p-3 hover:bg-gray-100 cursor-pointer rounded-lg"
      onClick={handleUserClick}
    >
      <Avatar
        alt={user?.fullName}
        src={user?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
        sx={{ width: 50, height: 50 }}
      />
      <div className="flex flex-col">
        <span className="font-semibold text-[16px]">
          {user?.fullName}
        </span>
        <span className="text-gray-500 text-sm">
          @{user?.fullName?.split(" ").join("_").toLowerCase()}
        </span>
         
      </div>
    </div>
  );
};

export default UserCard;