import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import useGetAllUser from "../../hooks/api/useGetAllUser";
import { useAuth } from "../../states/auth";
import { TiTick } from "react-icons/ti";
import Loading from "../Loading";

const AllUsers = () => {
  const { localUser } = useAuth();
  const { data, isLoading, refetch } = useGetAllUser();

  // All users except me
  const otherAllUsers = useMemo(() => {
    return data?.filter((user) => user._id !== localUser?._id);
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }
  if (!data) {
    return;
  }
  return (
    <div className="w-full border bg-white p-3 shadow-md rounded mt-10 ">
      <div className="">
        <span className="border-b border-textColor">
          All users you can follow{" "}
        </span>
      </div>
      <div className="flex items-center justify-center gap-3">
        {otherAllUsers?.map((user) => {
          const userIfollor = user.followers.find(
            (f) => f.followersId === localUser._id
          );
          console.log("ifollow", userIfollor);
          return (
            <div key={user.id} className="flex items-center justify-center ">
              <Link href={`profile/${user.username}`}>
                <a className="relative flex flex-col items-center gap-1">
                  <div className="relative w-16 h-16 border shadow-avatarShadow rounded-full overflow-hidden">
                    <Image
                      className="w-full h-full"
                      alt=""
                      src={user?.profilePicture}
                      objectFit="cover"
                      layout="fill"
                      width={600}
                      height={350}
                    ></Image>
                  </div>
                  <div className="absolute top-0 right-0.5">
                    {userIfollor && (
                      <div className="rounded-full text-white bg-primaryGreen">
                        <TiTick />
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-bold opacity-90">
                    {user.name[0].toUpperCase() + user.name.slice(1)}
                  </p>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllUsers;
