import Image from "next/image";
import { useRouter } from "next/router";
import { GoLocation } from "react-icons/go";
import { FaUserEdit } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import { useMemo, memo, useEffect } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiUserFollowLine } from "react-icons/ri";
import { RiUserUnfollowLine } from "react-icons/ri";
import { MdOutlineWorkOutline } from "react-icons/md";

import userInfo from "../../data/userInfo";
import { useAuth } from "../../states/auth";
import Layout from "../../components/Layout";
import Posts from "../../components/Posts";
import Loading from "../../components/Loading";
import { useAppContext } from "../../states/app";
import withProtectedRoute from "../withProtectedRoute";
import useGetAllUser from "../../hooks/api/useGetAllUser";
import useGetMyAllPosts from "../../hooks/api/useGetMyAllPosts";
import EditProfileModal from "../../components/EditProfileModal";
import { useMutateUserFollow } from "../../hooks/api/mutations/useMutateUserFollow";
import { useMutateUserUnFollow } from "../../hooks/api/mutations/useMutateUserUnFollow";

const Profile = () => {
  const router = useRouter();
  const queryId = router.query.id;

  const { localUser } = useAuth();

  const { data, isLoading, refetch } = useGetAllUser();

  const { setIsOpenEditProfileModal, isOpenEditProfileModal } = useAppContext();

  const user = useMemo(() => {
    return data?.find((user) => user.username === queryId);
  }, [queryId, data]);

  const mutateKEY = useMemo(() => {
    return ["getMyAllPosts", user?._id];
  }, [user]);

  const { myPost, isLoadingMyAllPosts, refetchMyAllPosts } = useGetMyAllPosts(
    user?._id
  );

  const { name, lastname, job, country, city, desc, picUrl } = userInfo(user);
  const profilePic = picUrl !== process.env.NEXT_PUBLIC_API_URL;

  const me = useMemo(() => {
    return localUser?._id === user?._id;
  }, [localUser, user]);

  const followControl = useMemo(() => {
    return user?.followers.find((user) => user?.followersId === localUser?._id);
  }, [user, me, data]);

  // User Follow
  const { mutateAsync: userFollowMutateAsync, isLoading: userFollowIsLoading } =
    useMutateUserFollow(["getAllUser"]);

  //User Unfollow
  const {
    mutateAsync: userUnFollowMutateAsync,
    isLoading: userUnFollowIsLoading,
  } = useMutateUserUnFollow(["getAllUser"]);

  const openModal = () => {
    setIsOpenEditProfileModal(true);
  };

  useEffect(() => {
    refetch();
  }, [isOpenEditProfileModal, followControl]);

  if (isLoading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  return (
    <Layout>
      <div className="w-full">
        <div className="absolute left-0 -z-10  flex w-full h-[500px] rounded overflow-hidden ">
          <div className="relative w-full h-full">
            <Image
              src="/test.jpeg"
              objectFit="cover"
              layout="fill"
              priority={true}
            />
          </div>
          <div className="absolute w-full h-full bg-black/60"></div>
        </div>

        <div className="w-full flex items-center justify-center pt-[250px]">
          <div className="relative w-[90%] min-h-[300px] flex flex-col items-center bg-white border shadow rounded ">
            <div className="absolute flex items-center justify-center -top-[96px]">
              {profilePic && (
                <div className="relative w-48 h-48 p-1 shadow-avatarShadow rounded-full overflow-hidden">
                  <Image
                    className="w-full h-full"
                    src={user?.profilePicture}
                    objectFit="cover"
                    layout="fill"
                    width={600}
                    height={350}
                  ></Image>{" "}
                </div>
              )}
              {!profilePic && (
                <div className="relative w-48 h-48 flex items-center justify-center bg-white p-1 shadow-avatarShadow rounded-full overflow-hidden">
                  <button
                    onClick={openModal}
                    className="w-40 h-40 flex flex-col items-center justify-center rounded-full text-5xl hover:text-primaryBlue"
                  >
                    <AiOutlineUserAdd />
                    <p className="text-xs font-bold">Add Avatar</p>
                  </button>
                </div>
              )}
            </div>
            <div className="w-full flex justify-between pt-16 px-16 pb-8">
              <div className="flex items-center gap-7">
                <div className="flex flex-col items-center">
                  <p className="text-xl font-extrabold text-gray-700">
                    {user.posts}
                  </p>
                  <p className=" text-gray-700/50">Post</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-xl font-extrabold text-gray-700">
                    {user.followers.length}
                  </p>
                  <p className=" text-gray-700/50">Followers</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-xl font-extrabold text-gray-700">
                    {user.following.length}
                  </p>
                  <p className=" text-gray-700/50">Following</p>
                </div>
              </div>
              {!me && (
                <div className="flex items-center">
                  {!followControl && (
                    <button
                      onClick={async () => {
                        await userFollowMutateAsync(user._id);
                      }}
                      disabled={userFollowIsLoading}
                      className={`${
                        userFollowIsLoading ? " disabled:bg-primaryBlue/50" : ""
                      } flex py-1 px-5 rounded bg-primaryBlue hover:bg-primaryGreen text-white items-center gap-1 mr-10`}
                    >
                      <RiUserFollowLine />
                      <p>Follow</p>
                    </button>
                  )}
                  {followControl && (
                    <button
                      onClick={async () => {
                        await userUnFollowMutateAsync(user._id);
                      }}
                      disabled={userUnFollowIsLoading}
                      className={`${
                        userUnFollowIsLoading ? "disabled:bg-red-800/50" : ""
                      } flex py-1 px-5 rounded bg-red-800 hover:bg-primaryGreen text-white items-center gap-1 mr-10`}
                    >
                      <RiUserUnfollowLine />
                      <p>Unfollow</p>
                    </button>
                  )}
                </div>
              )}
              {me && (
                <button
                  onClick={openModal}
                  className="text-2xl hover:text-black"
                >
                  <FaUserEdit />
                </button>
              )}
            </div>
            <div className="flex flex-col items-center justify-center pb-5">
              <div className="text-3xl font-extrabold">
                <h1>
                  {name} {lastname}
                </h1>
              </div>
              <div className="flex flex-col gap-2 items-center pt-7">
                <div className="flex items-center gap-1 text-lg font-extrabold uppercase opacity-80">
                  {(!country || !city) && me && (
                    <div className="flex flex-col">
                      <button onClick={openModal}>
                        <div className="flex gap-1 items-center hover:text-black">
                          <GoLocation />
                          <p>Add location information 🚩</p>
                        </div>
                      </button>
                    </div>
                  )}
                  {(country || city) && (
                    <button onClick={openModal}>
                      <h1 className="font-semibold">
                        {country}, {city}
                      </h1>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1  opacity-80">
                  {!job && me && (
                    <div className="flex flex-col gap-1">
                      <button onClick={openModal}>
                        <div className="flex items-center gap-1 hover:text-black">
                          <MdOutlineWorkOutline />
                          Add job information 👀
                        </div>
                      </button>
                    </div>
                  )}
                  {job && (
                    <button onClick={openModal}>
                      <h1 className="flex items-center gap-1 ">
                        <MdOutlineWorkOutline />
                        {job}
                      </h1>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1  opacity-80">
                  <div className="relative flex group items-center cursor-default gap-2">
                    {!desc && me && (
                      <div>
                        <button onClick={openModal}>
                          <div className="flex items-center gap-1 hover:text-black">
                            <BsPencilFill />
                            Describe yourself in 50 words 🙄
                          </div>
                        </button>
                      </div>
                    )}
                    {desc && (
                      <button onClick={openModal}>
                        <h1 className="flex items-center gap-1 ">
                          <BsPencilFill />
                          {desc}
                        </h1>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-5 px-20 py-10">
              <Posts
                userId={user?._id}
                mutateKEY={mutateKEY}
                posts={myPost}
                isLoading={isLoadingMyAllPosts}
                refetch={refetchMyAllPosts}
              />
            </div>
          </div>
        </div>
      </div>
      {me && isOpenEditProfileModal && <EditProfileModal />}
    </Layout>
  );
};

export default withProtectedRoute(memo(Profile));
