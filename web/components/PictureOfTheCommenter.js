import React from "react";
import Image from "next/image";
import Link from "next/link";

const PictureOfTheCommenter = ({ profilePic, link }) => {
  return (
    <div className={`relative w-10 h-10 rounded-full overflow-hidden`}>
      <Link href={`/profile/${link}`}>
        <a>
          <Image
            className="w-full h-full"
            alt=""
            src={profilePic}
            objectFit="cover"
            layout="fill"
          />
        </a>
      </Link>
    </div>
  );
};

export default PictureOfTheCommenter;
