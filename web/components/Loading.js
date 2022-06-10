import React from "react";

const Loading = () => {
  return (
    <>
      <div className="w-full border bg-white py-10 flex items-center justify-center shadow-md rounded">
        <img className="w-24 h-24" src="loading.gif"></img>
      </div>
    </>
  );
};

export default Loading;
