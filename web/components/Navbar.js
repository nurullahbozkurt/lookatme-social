import React from "react";
import Link from "next/link";
import Image from "next/image";
import Axios from "../lib/axios";
import Dropdown from "./Dropdown";
import { useQuery } from "react-query";
import ReactLoading from "react-loading";

const Navbar = () => {
  const [filter, setFilter] = React.useState();

  const fetchData = async (filter) => {
    return await Axios.get(`/search/${filter}`);
  };

  const { data, isLoading, isError } = useQuery(["search", filter], () =>
    fetchData(filter)
  );

  console.log("isLoading", isLoading, data);

  return (
    <>
      <div className="w-full flex items-center border-b justify-between h-20 bg-white px-10">
        <div>
          <Link href={"/"}>
            <a className="text-3xl font-poiret text-center">look@me</a>
          </Link>
        </div>
        <div className=" flex-1 hidden sm:block px-10 md:px-20">
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Search
            </label>
            <div className="relative group ">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                onChange={(e) => setFilter(e.target.value)}
                type="text"
                className="block peer p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Are you look@me ? "
              />
              <button
                type="submit"
                className="text-white absolute right-0 top-0 bottom-0 bg-primaryBlue hover:bg-primaryGreen focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
              {data && (
                <div className="absolute hidden hover:block peer-focus:block bg-white mt-1 p-3 rounded w-full overflow-scroll border">
                  {isLoading && (
                    <div>
                      <ReactLoading
                        type={"spin"}
                        color={"#0089BA"}
                        height={20}
                        width={20}
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    {data.data.length === 0 && (
                      <div className="text-center">
                        <p className="text-sm text-gray-600">User not found</p>
                      </div>
                    )}
                    {data?.data?.map((user) => (
                      <Link key={user._id} href={`profile/${user.username}`}>
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

                          <p className="text-xs font-bold opacity-90">
                            {user.name}
                          </p>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
        <div>
          <Dropdown />
        </div>
      </div>
    </>
  );
};

export default Navbar;
