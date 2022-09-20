import Image from "next/image";
import React, { useState } from "react";
import { useMutation } from "react-query";
import userInfo from "../../data/userInfo";
import { GoLocation } from "react-icons/go";
import { MdAddAPhoto } from "react-icons/md";
import Loading from "../../components/Loading";
import { AiOutlineUserAdd } from "react-icons/ai";

import Link from "next/link";
import { memo } from "react";
import Axios from "../../lib/axios";
import { useAuth } from "../../states/auth";
import useGetUser from "../../hooks/api/useGetUser";

const ProfileCard = () => {
  const { localUser } = useAuth();

  const { user, isLoading, timeLineRefetch } = useGetUser(localUser?._id);

  const { picUrl, name, lastname, job, country, city } = userInfo(
    user,
    isLoading
  );

  const profilePic = picUrl !== process.env.NEXT_PUBLIC_API_URL;

  const [file, setFile] = useState();
  const [avatar, setAvatar] = useState();
  const hiddenFileInput = React.useRef();

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const newFile = URL.createObjectURL(file);
    setAvatar(newFile);
  };
  const uploadRequest = useMutation(() => {
    let formData = new FormData();
    formData.append("file", file);
    return Axios.post(`/users/${user?._id}/profile-picture`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  });

  const uploadAvatar = async () => {
    try {
      await uploadRequest.mutateAsync();
      timeLineRefetch();
      setAvatar();
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="w-full border bg-white py-10 flex items-center justify-center shadow-md rounded">
        <div className="flex flex-col items-center gap-3">
          <div className="relative shadow-avatarShadow flex items-center justify-center border rounded-full p-1">
            {profilePic && (
              <>
                {!avatar && (
                  <button onClick={handleClick} className="group ">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden">
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
                    <input
                      onChange={handleAvatar}
                      ref={hiddenFileInput}
                      accept="image/*"
                      style={{ display: "none" }}
                      type="file"
                    />
                    <div className="absolute bottom-0 right-2 text-2xl hidden group-hover:block">
                      <MdAddAPhoto />
                    </div>
                  </button>
                )}
                {avatar && (
                  <div className="relative">
                    <img
                      className="w-32 h-32 rounded-full opacity-20 "
                      src={avatar}
                    ></img>
                    <div className="top-[55px] left-4 absolute">
                      <button
                        onClick={uploadAvatar}
                        className="text-sm border rounded bg-primaryBlue text-white px-1"
                      >
                        Upload Avatar
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
            {!profilePic && (
              <>
                {!avatar && (
                  <button
                    onClick={handleClick}
                    className="w-32 h-32 flex flex-col items-center justify-center rounded-full text-5xl hover:text-primaryBlue"
                  >
                    <AiOutlineUserAdd />
                    <p className="text-xs font-bold">Add Avatar</p>
                    <input
                      onChange={handleAvatar}
                      ref={hiddenFileInput}
                      accept="image/*"
                      style={{ display: "none" }}
                      type="file"
                    />
                  </button>
                )}
                {avatar && (
                  <div className="relative">
                    <img
                      className="w-32 h-32 rounded-full opacity-20 "
                      src={avatar}
                    ></img>
                    <div className="top-[55px] left-4 absolute">
                      <button
                        onClick={uploadAvatar}
                        className="text-sm border rounded bg-primaryBlue text-white px-1"
                      >
                        Upload Avatar
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="flex items-center gap-1.5">
              <Link href={`/profile/${user.username}`}>
                <a className="font-bold text-lg">{name + " " + lastname}</a>
              </Link>
              <h1 className="text-sm font-medium text-gray-500 text-opacity-80">
                {job}
              </h1>
            </div>
            {user?.country && (
              <div className="flex items-center justify-center gap-2">
                <GoLocation />
                <h1 className="text-gray-500">
                  {country}, {city}
                </h1>
              </div>
            )}
            <div className="flex items-center gap-7">
              <div className="flex flex-col items-center">
                <p className="font-bold">{user?.posts}</p>
                <p className="font-bold opacity-50">Post</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bold">{user?.followers.length}</p>
                <p className="font-bold opacity-50">Followers</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bold">{user?.following.length}</p>
                <p className="font-bold opacity-50">Following</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ProfileCard);
