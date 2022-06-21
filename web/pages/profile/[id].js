import Image from "next/image";
import { useMemo, memo } from "react";
import { useRouter } from "next/router";
import { GoLocation } from "react-icons/go";
import { BsPencilFill } from "react-icons/bs";
import { GiPublicSpeaker } from "react-icons/gi";
import { RiUserFollowLine } from "react-icons/ri";
import { RiUserUnfollowLine } from "react-icons/ri";
import { MdOutlineWorkOutline } from "react-icons/md";

import userInfo from "../../data/userInfo";
import { useAuth } from "../../states/auth";
import Layout from "../../components/Layout";
import MyPosts from "../../components/MyPosts";
import Loading from "../../components/Loading";
import withProtectedRoute from "../withProtectedRoute";
import useGetAllUser from "../../hooks/api/useGetAllUser";
import { useMutateUserFollow } from "../../hooks/api/mutations/useMutateUserFollow";
import { useMutateUserUnFollow } from "../../hooks/api/mutations/useMutateUserUnFollow";

const Profile = () => {
  const router = useRouter();
  const queryId = router.query.id;

  const { localUser } = useAuth();
  const { data, isLoading } = useGetAllUser();

  const user = useMemo(() => {
    return data?.find((user) => user.username === queryId);
  }, [queryId, data]);

  const me = useMemo(() => {
    return localUser?.username === user?.username;
  }, [localUser, user]);

  const followControl = useMemo(() => {
    return user?.followers.find((user) => user?.followersId === localUser?._id);
  }, [user, me, data]);

  // Mutations
  const { mutateAsync: userFollowMutateAsync, isLoading: userFollowIsLoading } =
    useMutateUserFollow(["getAllUser"]);

  const {
    mutateAsync: userUnFollowMutateAsync,
    isLoading: userUnFollowIsLoading,
  } = useMutateUserUnFollow(["getAllUser"]);

  const { name, lastname, job, country, city } = userInfo(user);

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
              src="/mustang.jpg"
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
              <div className="relative w-48 h-48 shadow-avatarShadow rounded-full overflow-hidden">
                <Image
                  className="w-full h-full"
                  src={user?.profilePicture}
                  objectFit="cover"
                  layout="fill"
                  width={600}
                  height={350}
                ></Image>{" "}
              </div>
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
            </div>
            <div className="flex flex-col items-center justify-center pb-5">
              <div className="text-3xl font-extrabold">
                <h1>
                  {name} {lastname}
                </h1>
              </div>
              <div className="flex flex-col gap-2 items-center pt-7">
                <div className="flex items-center gap-1 text-lg font-extrabold uppercase opacity-80">
                  <div>
                    {" "}
                    <GoLocation />
                  </div>
                  {(country === "" || city === "") && (
                    <h1>add location information 🚩</h1>
                  )}
                  {(country !== "" || city !== "") && (
                    <h1>
                      {country}, {city}
                    </h1>
                  )}
                </div>
                <div className="flex items-center gap-1  opacity-80">
                  <div>
                    <MdOutlineWorkOutline />
                  </div>
                  {job === "" && <h1>Add job information 👀</h1>}
                  {job !== "" && <h1>{job}</h1>}
                </div>
                <div className="flex items-center gap-1  opacity-80">
                  <div>
                    <BsPencilFill />
                  </div>
                  <div className="relative flex group items-center cursor-default gap-2">
                    {`${
                      user.desc ? user.desc : "Describe yourself in 50 words 🙄"
                    }`}
                    <button className="absolute hidden -right-7 group-hover:block text-3xl text-red-800 hover:text-primaryGreen">
                      <GiPublicSpeaker />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-5 px-20 py-10">
              <MyPosts userId={user?._id} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withProtectedRoute(memo(Profile));
