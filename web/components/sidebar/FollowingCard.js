import React from "react";

const FollowingCard = () => {
  console.log("FollowingCard");
  return (
    <>
      <div className="w-full border bg-white p-7 flex flex-col items-center justify-center gap-5 shadow-md rounded">
        <div className="w-full font-semibold">
          <h1>Following</h1>
        </div>
        <div className="w-full flex items-center gap-2 overflow-x-scroll">
          <div className="w-full">
            <div className="w-full">
              <img
                className="min-w-[64px] h-16 rounded-full "
                src="https://images.unsplash.com/photo-1638612913771-8f00622b96fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80"
                alt="Rounded avatar"
              />
            </div>
            <p className="text-xs font-bold opacity-90">Lara</p>
          </div>
          <div className="w-full">
            <div className="w-full">
              <img
                className="min-w-[64px] h-16 rounded-full "
                src="https://images.unsplash.com/photo-1638649602320-450b717fa622?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80"
                alt="Rounded avatar"
              />
            </div>
            <p className="text-xs font-bold opacity-90">Nora</p>
          </div>
          <div className="w-full">
            <div className="w-full">
              <img
                className="min-w-[64px] h-16 rounded-full "
                src="https://images.unsplash.com/photo-1638708644743-2502f38000a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80"
                alt="Rounded avatar"
              />
            </div>
            <p className="text-xs font-bold opacity-90">Lara</p>
          </div>
          <div className="w-full">
            <div className="w-full">
              <img
                className="min-w-[64px] h-16 rounded-full "
                src="https://i.picsum.photos/id/1027/200/200.jpg?hmac=fiXlkLLwYm7JmmU80uRIj9g21XD4q9v_lM_2Z57UhuA"
                alt="Rounded avatar"
              />
            </div>
            <p className="text-xs font-bold opacity-90">Vrej</p>
          </div>
          <div className="w-full">
            <div className="w-full">
              <img
                className="min-w-[64px] h-16 rounded-full "
                src="https://images.unsplash.com/photo-1638612913771-8f00622b96fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80"
                alt="Rounded avatar"
              />
            </div>
            <p className="text-xs font-bold opacity-90">Vrej</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowingCard;
