import Image from "next/image";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { GoLocation } from "react-icons/go";
import { BsPencilFill } from "react-icons/bs";
import { useMemo, memo, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { RiUserFollowLine } from "react-icons/ri";
import { RiUserUnfollowLine } from "react-icons/ri";
import TextareaCounter from "react-textarea-counter";
import { MdOutlineWorkOutline } from "react-icons/md";

import Axios from "../../lib/axios";
import userInfo from "../../data/userInfo";
import { useAuth } from "../../states/auth";
import Layout from "../../components/Layout";
import MyPosts from "../../components/MyPosts";
import Loading from "../../components/Loading";
import CitySelect from "../../components/CitySelect";
import withProtectedRoute from "../withProtectedRoute";
import useGetAllUser from "../../hooks/api/useGetAllUser";
import CountrySelect from "../../components/CountrySelect";
import { useMutateUserFollow } from "../../hooks/api/mutations/useMutateUserFollow";
import { useMutateUserUnFollow } from "../../hooks/api/mutations/useMutateUserUnFollow";

const Profile = () => {
  const router = useRouter();
  const queryId = router.query.id;

  const { localUser } = useAuth();
  const { data, isLoading, refetch } = useGetAllUser();

  // States
  const [updateUser, setUpdateUser] = useState({
    country: user?.country,
    city: user?.city,
    job: user?.job,
  });
  const [hiddenLocationSelect, setHiddenLocationSelect] = useState(false);
  const [hiddenJobInput, setHiddenJobInput] = useState(false);
  const [hiddenDescInput, setHiddenDescInput] = useState(false);

  const user = useMemo(() => {
    return data?.find((user) => user.username === queryId);
  }, [queryId, data]);

  const { name, lastname, job, country, city, desc } = userInfo(user);

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

  //Update User Location | Desc
  const fetchUpdateUserLocation = useMutation(() => {
    return Axios.put(`/users/${user?._id}`, updateUser);
  });

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
                  {(!country || !city) && me && (
                    <div className="flex flex-col">
                      <button
                        onClick={() =>
                          setHiddenLocationSelect(!hiddenLocationSelect)
                        }
                      >
                        <div className="flex gap-1 items-center hover:text-black">
                          <GoLocation />
                          <p>Add location information 🚩</p>
                        </div>
                      </button>
                      <div
                        className={`${
                          hiddenLocationSelect ? "block" : "hidden"
                        } flex flex-col gap-2 border rounded p-2 my-2`}
                      >
                        <CountrySelect
                          form={updateUserLocation}
                          onChange={(e) =>
                            setUpdateUser({
                              ...updateUser,
                              country: e.target.value,
                            })
                          }
                        />
                        <CitySelect
                          form={updateUserLocation}
                          onChange={(e) =>
                            setUpdateUser({
                              ...updateUser,
                              city: e.target.value,
                            })
                          }
                        />
                        <button
                          onClick={async () => {
                            await fetchUpdateUserLocation.mutateAsync();
                            refetch();
                          }}
                          className="flex items-center justify-center border hover:border-primaryGreen p-0.5 rounded-full hover:text-primaryGreen text-primaryBlue border-primaryBlue"
                        >
                          <IoIosAddCircle />
                        </button>
                      </div>
                    </div>
                  )}
                  {(country || city) && (
                    <h1>
                      {country}, {city}
                    </h1>
                  )}
                </div>

                <div className="flex items-center gap-1  opacity-80">
                  {!job && me && (
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => setHiddenJobInput(!hiddenJobInput)}
                      >
                        <div className="flex items-center gap-1 hover:text-black">
                          <MdOutlineWorkOutline />
                          Add job information 👀
                        </div>
                      </button>
                      <div
                        className={`${
                          hiddenJobInput ? "block" : "hidden"
                        } w-full rounded flex justify-between items-center`}
                      >
                        <input
                          onChange={(e) =>
                            setUpdateUser({
                              ...updateUser,
                              job: e.target.value,
                            })
                          }
                          className="border-b rounded"
                        />
                        <button
                          onClick={async () => {
                            await fetchUpdateUserLocation.mutateAsync();
                            refetch();
                          }}
                          className="flex items-center justify-center border hover:border-primaryGreen p-0.5 rounded-full hover:text-primaryGreen text-primaryBlue border-primaryBlue"
                        >
                          <IoIosAddCircle />
                        </button>
                      </div>
                    </div>
                  )}
                  {job && (
                    <h1 className="flex items-center gap-1 ">
                      <MdOutlineWorkOutline />
                      {job}
                    </h1>
                  )}
                </div>

                <div className="flex items-center gap-1  opacity-80">
                  <div className="relative flex group items-center cursor-default gap-2">
                    {!desc && me && (
                      <div>
                        <button
                          onClick={() => setHiddenDescInput(!hiddenDescInput)}
                        >
                          <div className="flex items-center gap-1 hover:text-black">
                            <BsPencilFill />
                            Describe yourself in 50 words 🙄
                          </div>
                        </button>
                        <div
                          className={`${
                            hiddenDescInput ? "block" : "hidden"
                          } w-full rounded flex items-center justify-center gap-2`}
                        >
                          <TextareaCounter
                            className="text-sm border-b"
                            countLimit="50"
                            placeholder=""
                            maxLength="50"
                            rows="2"
                            onChange={(e) =>
                              setUpdateUser({
                                ...updateUser,
                                desc: e.target.value,
                              })
                            }
                          />
                          <button
                            onClick={async () => {
                              await fetchUpdateUserLocation.mutateAsync();
                              refetch();
                            }}
                            className="flex items-center justify-center border hover:border-primaryGreen p-0.5 rounded-full hover:text-primaryGreen text-primaryBlue border-primaryBlue"
                          >
                            <IoIosAddCircle />
                          </button>
                        </div>
                      </div>
                    )}
                    {desc && (
                      <h1 className="flex items-center gap-1 ">
                        <BsPencilFill />
                        {desc}
                      </h1>
                    )}
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
