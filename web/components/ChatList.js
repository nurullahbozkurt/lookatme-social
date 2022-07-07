import Image from "next/image";
import Link from "next/link";
import React from "react";
import useGetConversations from "../hooks/useGetConversations";
import userInfo from "../data/userInfo";
import { format, render, cancel, register } from "timeago.js";
import ReactLoading from "react-loading";

const ChatList = () => {
  const { data, isLoading, refetch } = useGetConversations();
  if (isLoading)
    return (
      <div>
        <ReactLoading type={"spin"} color={"#0089BA"} height={20} width={20} />
      </div>
    );
  return (
    <>
      {data &&
        data?.data.map((conv) => {
          const { name, lastname } = userInfo(conv?.user[0]);
          const dateFormat = new Date(conv?.message?.createdAt); // dateStr you get from mongodb
          const date = format(dateFormat, "PPpp");
          return (
            <button className="w-full flex items-center gap-2 border p-2 rounded hover:bg-primaryGreen/20 bg-primaryBlue/20">
              <div className="w-full flex-1">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Link href={"/"}>
                    <a>
                      <Image
                        className="w-full h-full"
                        alt=""
                        src={conv?.user[0].profilePicture}
                        objectFit="cover"
                        layout="fill"
                      ></Image>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="w-full flex flex-col items-start ">
                <div className="w-full flex items-center justify-between ">
                  <p className="text-sm font-semibold">
                    {name} {lastname}
                  </p>
                  {conv.message && <p className="text-[10px]">{date}</p>}
                </div>

                <p className="text-xs text-left">{conv?.message?.message}</p>
              </div>
            </button>
          );
        })}
      {!data && <div></div>}
    </>
  );
};

export default ChatList;
