import React from "react";
import { GoLocation } from "react-icons/go";
import { IoHeartDislikeSharp } from "react-icons/io5";

const ProfileCard = () => {
  return (
    <>
      <div className="w-full border bg-white py-10 flex items-center justify-center shadow-md rounded">
        <div className="flex flex-col items-center gap-3">
          <div className="relative shadow-avatarShadow border rounded-full p-1">
            <img
              className="w-32 h-32 rounded-full "
              src="https://avatars.githubusercontent.com/u/86301102?v=4"
              alt="Rounded avatar"
            />
            <div className="absolute top-0 -right-2">
              <div className="text-red-700/60 text-2xl">
                <IoHeartDislikeSharp />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-lg">Nurullah Bozkurt </h1>
              <h1 className="text-sm font-medium text-gray-500 text-opacity-80">
                React Developer
              </h1>
            </div>
            <div className="flex items-center justify-center gap-2">
              <GoLocation />
              <h1 className="text-gray-500">Turkey, Istanbul</h1>
            </div>
            <div className="flex items-center gap-7">
              <div className="flex flex-col items-center">
                <p className="font-bold">121</p>
                <p className="font-bold opacity-50">Post</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bold">234</p>
                <p className="font-bold opacity-50">Followers</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bold">325</p>
                <p className="font-bold opacity-50">Following</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
