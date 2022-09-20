import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { format } from "timeago.js";
import { BiSend } from "react-icons/bi";
import { useMutation } from "react-query";

import Axios from "../../lib/axios";
import { useRouter } from "next/router";
import { useAuth } from "../../states/auth";
import Layout from "../../components/Layout";
import ChatList from "../../components/ChatList";
import useGetAllUser from "../../hooks/api/useGetAllUser";
import useGetMessages from "../../hooks/api/useGetMessages";
import useGetUser from "../../hooks/api/useGetUser";
import userInfo from "../../data/userInfo";

const Messages = () => {
  const { localUser } = useAuth();
  const scrollRef = useRef();

  const [showChats, setShowChats] = useState(false);

  const conversationId = useRouter().query.convId;
  const receiverUserUsername = useRouter().query.messages;

  const {
    data: allUserData,
    isLoading: allUserIsLoading,
    refetch: allUserRefetch,
  } = useGetAllUser();
  const { data, isLoading, refetch } = useGetMessages(conversationId);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  const receiverUser = allUserData?.find(
    (user) => user.username === receiverUserUsername
  );

  const { name, lastname } = userInfo(receiverUser);

  const [newMessage, setNewMessage] = useState("");

  const fetchMessage = useMutation(() => {
    return Axios.post(`/messages`, {
      conversationId: conversationId,
      receiverId: receiverUser?._id,
      senderId: localUser?._id,
      message: newMessage,
    });
  });

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    await fetchMessage.mutateAsync();
    setNewMessage("");
    refetch();
  };

  return (
    <Layout>
      <button
        onClick={() => setShowChats(!showChats)}
        className="block md:hidden w-full  border rounded my-2 bg-primaryBlue/20 hover:bg-primaryGreen/20 font-semibold"
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
        } w-full max-h-[600px] flex md:mt-5  bg-white rounded border`}
      >
        <div className="w-full hidden md:block max-w-[300px] lg:max-w-[400px] p-4 border-r ">
          <div className="py-4 text-xl">
            <h1>Chats</h1>
          </div>
          <div className="flex flex-col gap-3">
            <ChatList />
          </div>
        </div>
        {receiverUser && (
          <div className=" w-full  flex flex-col justify-between p-4">
            <Link href={`/profile/${receiverUser?.username}`}>
              <a className="w-full flex items-center gap-2 mb-4 pb-4 border-b ">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    className="w-full "
                    alt=""
                    src={receiverUser?.profilePicture}
                    objectFit="cover"
                    layout="fill"
                  ></Image>
                </div>
                <p className="font-semibold">
                  {name} {lastname}
                </p>
              </a>
            </Link>
            <div className="w-full overflow-scroll flex flex-col">
              {data?.data.map((message) => {
                console.log("myMessages", message);
                const dateFormat = new Date(message?.createdAt);
                const date = format(dateFormat, "PPpp");
                return (
                  <div ref={scrollRef}>
                    {message.senderId !== localUser?._id && (
                      <div className="w-full flex justify-start pr-20 py-2">
                        <div className="border rounded-[10px] text-[15px] bg-gray-100 px-2 py-1">
                          <p>
                            {message.message}
                            <span className="text-[10px] opacity-40 flex justify-end">
                              {date}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}

                    {message.senderId === localUser?._id && (
                      <div className="w-full flex justify-end pl-20 py-2">
                        <div className="border rounded-[10px] text-[15px] bg-primaryGreen/20 px-2 py-1">
                          <p>
                            {message.message}
                            <span className="text-[10px] opacity-40 flex justify-end">
                              {date}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="">
              <form
                onSubmit={(e) => handleSubmitMessage(e)}
                className="w-full flex items-center gap-2"
              >
                <input
                  placeholder="Write a message.."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                  className="w-full border px-2 py-1 rounded-[7px] placeholder:text-sm"
                />
                <button
                  type="submit"
                  className="flex items-center text-xl hover:text-primaryBlue"
                >
                  <BiSend />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Messages;
