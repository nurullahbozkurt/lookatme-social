import React, { useEffect, useState } from "react";
import FollowingCard from "./FollowingCard";
import MyAllPostsCard from "./MyAllPostsCard";
import ProfileCard from "./ProfileCard";

const Sidebar = () => {
  const [sidebarScrollPosition, setSidebarScrollPosition] = useState(null);
  const [windowScrollPosition, setWindowScrollPosition] = useState(null);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleWindowScroll);
  //   window.onscroll = function () {
  //     //window.scrollTo(0, 0);
  //   };
  //   return () => window.removeEventListener("scroll", handleWindowScroll);
  // });

  // const handleWindowScroll = () => {
  //   setWindowScrollPosition(window.scrollY);

  //   if (sidebarScrollPosition > 20 && windowScrollPosition < 225) {
  //     document.getElementById("sidebar").scrollTo(0, windowScrollPosition);
  //   }
  // };

  // const onScroll = (e) => {
  //   setSidebarScrollPosition(e.target.scrollTop);
  // };
  return (
    <>
      <div className="sticky w-full h-[860px] top-[90px] flex flex-col gap-5">
        <div
          //onScroll={onScroll}
          id="sidebar"
          className="w-full h-screen overflow-scroll space-y-5"
        >
          <ProfileCard />
          <FollowingCard />
          <MyAllPostsCard />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
