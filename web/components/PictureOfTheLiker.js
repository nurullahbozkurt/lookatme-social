import Image from "next/image";
import Link from "next/link";
import React from "react";

const PictureOfTheLiker = ({ user }) => {
  return (
    <div>
      <div className="relative w-7 h-7 rounded-full overflow-hidden">
        <Link href={`profile/${user.username}`}>
          <a>
            <Image
              className="w-full h-full"
              alt=""
              src={user.profilePicture}
              objectFit="cover"
              layout="fill"
            ></Image>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PictureOfTheLiker;
