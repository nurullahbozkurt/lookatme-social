import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import useGetMessages from "../../hooks/api/useGetMessages";
import ChatList from "../../components/ChatList";
import { useAuth } from "../../states/auth";
import { format, render, cancel, register } from "timeago.js";

const Messages = () => {
  const conversationId = useRouter().query.messages;
  const { localUser } = useAuth();
  const [showChats, setShowChats] = useState(false);
  const { data, isLoading, refetch } = useGetMessages(conversationId);
  console.log("data", data);
  console.log(localUser);

  const meMessage = data?.data.filter(
    (message) => message.senderId === localUser?._id
  );
  const otherMessage = data?.data.filter(
    (message) => message.senderId !== localUser?._id
  );
  console.log("meMessage", meMessage);
  console.log("otherMessage", otherMessage);

  return (
    <Layout>
      <button
        onClick={() => setShowChats(!showChats)}
        className="block md:hidden w-full border rounded my-2 bg-primaryBlue/20 hover:bg-primaryGreen/20 font-semibold"
      >
        {" "}
        Chats
      </button>
      <div
        className={`${
          showChats ? "block" : "hidden"
        } w-full flex md:mt-5 bg-white rounded border`}
      >
        <div className="w-full p-5 flex flex-col gap-3">
          <ChatList />
        </div>
      </div>
      <div
        className={`${
          showChats ? "hidden" : "block"
        } w-full flex md:mt-5 bg-white rounded border`}
      >
        <div className="w-full hidden md:block max-w-[300px] lg:max-w-[400px] p-4 border-r ">
          <div className="py-4 text-xl">
            <h1>Chats</h1>
          </div>
          <div className="flex flex-col gap-3">
            <ChatList />
          </div>
        </div>
        <div className="w-full h-full p-4">
          <div className="w-full flex items-center gap-2 pb-4 border-b">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Link href={"/"}>
                <a>
                  <Image
                    className="w-full h-full"
                    alt=""
                    src={
                      "http://localhost:3000/_next/image?url=http%3A%2F%2Flocalhost%3A8800%2Fuploads%2F1656590292358-86301102.jpeg&w=3840&q=75"
                    }
                    objectFit="cover"
                    layout="fill"
                  ></Image>
                </a>
              </Link>
            </div>
            <p className="font-semibold">Nurullah Bozkurt</p>
          </div>
          <div className="w-full flex flex-col">
            {otherMessage?.map((message) => {
              const dateFormat = new Date(message?.createdAt); // dateStr you get from mongodb
              const date = format(dateFormat, "PPpp");
              return (
                <div className="w-full flex justify-start pr-20 py-2">
                  <div className="border rounded-[10px] text-[15px] bg-gray-100 px-2 py-1">
                    <p>
                      {message.message}
                      <span className="text-[10px] opacity-40 flex justify-end">
                        <br />
                        {date}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="w-full flex justify-end pl-20 py-2">
              {meMessage?.map((message) => {
                const dateFormat = new Date(message?.createdAt); // dateStr you get from mongodb
                const date = format(dateFormat, "PPpp");
                return (
                  <div className="border rounded-[10px] text-[15px] bg-primaryGreen/20 px-2 py-1">
                    <p>
                      {message.message}
                      <span className="text-[10px] opacity-40 flex justify-end">
                        <br />
                        {date}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
