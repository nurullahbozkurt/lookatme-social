import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BiUser } from "react-icons/bi";
import { useAuth } from "../states/auth";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Dropdown() {
  const router = useRouter();
  const { localUser, logout } = useAuth();
  const username =
    localUser?.name.charAt(0).toUpperCase() +
    "." +
    localUser?.lastName.charAt(0).toUpperCase() +
    localUser?.lastName.slice(1).toLowerCase();

  const logOut = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primaryBlue  px-4 py-2 text-sm font-medium text-white hover:bg-primaryGreen focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {username}
            <div className="text-lg">
              <BiUser />
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={`${
                      active ? "bg-primaryBlue text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <Link href={`/profile/${localUser?.username}`}>
                      <a className="w-full">Profile</a>
                    </Link>
                  </div>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={`${
                      active ? "bg-primaryBlue text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <Link href={`/messages/m`}>
                      <a className="w-full">Messages</a>
                    </Link>
                  </div>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logOut}
                    className={`${
                      active ? "bg-primaryBlue text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
