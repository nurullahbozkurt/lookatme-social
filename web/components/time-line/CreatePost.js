import React from "react";
import { FiImage } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { BiSend } from "react-icons/bi";

const CreatePost = () => {
  return (
    <div className="w-full border bg-white p-5 flex flex-col gap-5 shadow-md rounded">
      <div className="flex flex-col gap-2">
        <div>
          <textarea
            placeholder="Type something .."
            className="w-full p-3 rounded-md bg-gray-100"
          />
        </div>
        <div className="flex items-center justify-between text-primaryBlue text-[22px]">
          <div className="flex items-center  gap-3">
            <button className="hover:text-primaryGreen">
              <FiImage />
            </button>
            <button className="hover:text-primaryGreen">
              <GoLocation />
            </button>
          </div>
          <button className="flex items-center gap-1 rounded-md text-white bg-primaryBlue text-sm px-3 py-1.5 hover:bg-primaryGreen">
            <span>Send</span>
            <BiSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
