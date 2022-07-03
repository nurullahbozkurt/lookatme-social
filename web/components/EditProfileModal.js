import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import userInfo from "../data/userInfo";
import { useMutation } from "react-query";
import { Fragment, useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import TextareaCounter from "react-textarea-counter";
import { Dialog, Transition } from "@headlessui/react";

import Axios from "../lib/axios";
import CitySelect from "./CitySelect";
import CountrySelect from "./CountrySelect";
import { useAppContext } from "../states/app";
import useGetUser from "../hooks/api/useGetUser";

const EditProfileModal = () => {
  const { isOpenEditProfileModal, setIsOpenEditProfileModal } = useAppContext();
  const router = useRouter();

  const { user, isLoading, timeLineRefetch } = useGetUser();

  const { picUrl } = userInfo(user);
  const profilePic = picUrl !== process.env.NEXT_PUBLIC_API_URL;

  const hiddenFileInput = React.useRef();

  const [form, setForm] = useState({
    username: user?.username,
    email: user?.email,
    country: user?.country,
    city: user?.city,
    name: user?.name,
    lastName: user?.lastName,
    desc: user?.desc,
  });

  const [file, setFile] = useState();
  const [avatar, setAvatar] = useState();

  const fetchUpdateUser = useMutation(() => {
    return Axios.put(`/users/${user?._id}`, form);
  });

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

  const closeModal = () => {
    setIsOpenEditProfileModal(false);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Transition appear show={isOpenEditProfileModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg flex items-center justify-between font-medium leading-6 text-gray-900"
                  >
                    <p>Edit Profile</p>
                    <p className=" opacity-50 text-sm">{user?.username}</p>
                  </Dialog.Title>
                  <div className="w-full flex items-start gap-3 mt-2">
                    <div className="w-full flex flex-col items-center gap-3">
                      {!avatar && profilePic && (
                        <button onClick={handleClick} className="relative">
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
                          <div className="absolute bottom-0 right-2 text-2xl text-textColor">
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
                      {!profilePic && !avatar && (
                        <div className="relative w-32 h-32 flex items-center justify-center bg-white p-1 shadow-avatarShadow rounded-full overflow-hidden">
                          <button
                            onClick={handleClick}
                            className="w-40 h-40 flex flex-col items-center justify-center rounded-full text-5xl hover:text-primaryBlue"
                          >
                            <AiOutlineUserAdd />
                            <p className="text-xs font-bold">Add Avatar</p>
                          </button>
                          <input
                            onChange={handleAvatar}
                            ref={hiddenFileInput}
                            accept="image/*"
                            style={{ display: "none" }}
                            type="file"
                          />
                        </div>
                      )}
                      <div className="w-full flex flex-col gap-2 px-2 ">
                        <CountrySelect
                          form={form}
                          onChange={(e) =>
                            setForm({ ...form, country: e.target.value })
                          }
                        />
                        <CitySelect
                          form={form}
                          onChange={(e) =>
                            setForm({ ...form, city: e.target.value })
                          }
                        />
                      </div>
                      <div className="w-full space-y-1">
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                          Bio
                        </label>
                        <TextareaCounter
                          onChange={(e) =>
                            setForm({ ...form, desc: e.target.value })
                          }
                          countLimit="50"
                          maxLength="50"
                          rows="2"
                          type="text"
                          defaultValue={user?.desc}
                          value={form.desc}
                          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="w-full flex flex-col items-start gap-3">
                      <div className="w-full space-y-1">
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                          Name
                        </label>
                        <input
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          type="text"
                          defaultValue={user?.name}
                          value={form.name}
                          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>
                      <div className="w-full space-y-1">
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                          Lastname
                        </label>
                        <input
                          type="text"
                          onChange={(e) =>
                            setForm({ ...form, lastName: e.target.value })
                          }
                          defaultValue={user?.lastName}
                          value={form.lastName}
                          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>
                      <div className="w-full space-y-1">
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                          Email
                        </label>
                        <input
                          type="text"
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          defaultValue={user?.email}
                          value={form.email}
                          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>
                      <div className="w-full space-y-1">
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                          Job
                        </label>
                        <input
                          type="text"
                          onChange={(e) =>
                            setForm({ ...form, job: e.target.value })
                          }
                          defaultValue={user?.job}
                          value={form.job}
                          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 w-full flex items-center justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Back !
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        await fetchUpdateUser.mutateAsync();
                        timeLineRefetch();
                        closeModal();
                      }}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Update Profile
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditProfileModal;
