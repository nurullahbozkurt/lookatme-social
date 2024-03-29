import Link from "next/link";
import Image from "next/image";
import { memo, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

import Loading from "../Loading";
import { useAuth } from "../../states/auth";
import useGetUser from "../../hooks/api/useGetUser";

const FollowingCard = () => {
  const { localUser } = useAuth();

  const { user, isLoading } = useGetUser(localUser?._id);

  const [changeFollow, setChangeFollow] = useState(false);

  const handleChangeFollow = () => {
    setChangeFollow(!changeFollow);
  };

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <>
      <div className="w-full border bg-white p-7 flex flex-col items-center justify-center gap-5 shadow-md rounded">
        <div className="w-full font-semibold">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <h1>{!changeFollow ? "Following" : "Followers"}</h1>{" "}
              <div className="rounded-full flex items-center justify-center bg-primaryGreen text-white p-0.5 w-5 h-5">
                <p className="text-sm">
                  {" "}
                  {!changeFollow
                    ? user.following.length
                    : user.followers.length}
                </p>
              </div>
            </div>
            <div
              role="button"
              onClick={handleChangeFollow}
              className="flex items-center gap-1 opacity-60 hover:opacity-90"
            >
              <h1 className="text-xs">
                {!changeFollow ? "Followers" : "Following"}
              </h1>
              <div>
                {" "}
                <IoIosArrowForward />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center gap-[10px] overflow-x-scroll">
          {!changeFollow &&
            user.following.map((user) => (
              <div key={user.id} className="flex flex-col items-center">
                <Link href={`profile/${user.user[0].username}`}>
                  <a className="flex flex-col items-center">
                    <div className="relative w-16 h-16 border shadow-avatarShadow rounded-full overflow-hidden">
                      <Image
                        className="w-full h-full"
                        alt=""
                        src={user.user[0].profilePicture}
                        objectFit="cover"
                        layout="fill"
                        width={600}
                        height={350}
                      ></Image>
                    </div>
                    <p className="text-xs font-bold opacity-90">
                      {user.user[0].name[0].toUpperCase() +
                        user.user[0].name.slice(1)}
                    </p>
                  </a>
                </Link>
              </div>
            ))}
          {changeFollow &&
            user.followers.map((user) => (
              <div key={user.id} className="flex flex-col items-center">
                <Link href={`profile/${user.user[0].username}`}>
                  <a className="flex flex-col items-center">
                    <div className="relative w-16 h-16 border shadow-avatarShadow rounded-full overflow-hidden">
                      <Image
                        className="w-full h-full"
                        alt=""
                        src={user.user[0].profilePicture}
                        objectFit="cover"
                        layout="fill"
                        width={600}
                        height={350}
                      ></Image>
                    </div>
                    <p className="text-xs font-bold opacity-90">
                      {user.user[0].name[0].toUpperCase() +
                        user.user[0].name.slice(1)}
                    </p>
                  </a>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default memo(FollowingCard);
