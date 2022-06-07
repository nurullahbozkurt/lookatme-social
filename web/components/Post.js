import { AiFillLike } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import useTimeLine from "../hooks/api/useTimeLine";
import { useAuth } from "../states/auth";
import Image from "next/image";
import { useRef, useState, useEffect, useMemo } from "react";
import Axios from "../lib/axios";
import { useMutation } from "react-query";

const TimeLinePost = () => {
  const { timeLine, timeLineRefetch } = useTimeLine();
  const { user } = useAuth();
  const [postId, setPostId] = useState(null);
  const ref = useRef();

  const iLike = useMemo(() => {
    return true;
    // if (!timeLine) return;
    // return timeLine.map((post) => {
    //   return post.likes.id.some((like) => like === user._id);
    // })[0];
  }, [timeLine]);

  useEffect(() => {
    handleLike();
  }, [postId]);

  const fetchLike = useMutation(() => {
    return Axios.put(`/posts/${postId}/like`);
  });

  const clickLikeButton = (e) => {
    setPostId(ref.current.value);
  };

  const handleLike = async () => {
    if (!postId) return;
    try {
      await fetchLike.mutateAsync();
    } catch (err) {
      console.log(err);
    }
    timeLineRefetch();
    setPostId(null);
  };

  return (
    <>
      {timeLine?.map((post) => {
        const name = post.user.name[0].toUpperCase() + post.user.name.slice(1);
        const lastname =
          post.user.lastName[0].toUpperCase() + post.user.lastName.slice(1);
        const job = post.user?.job
          ? post.user.job[0].toUpperCase() + post.user?.job.slice(1)
          : "";

        console.log("post", post.likes);
        // const whoLikedThePost = timeLine.map((post) => {
        //   return post.likes.id.filter((like) => like);
        // });
        // console.log("whoLikedThePost", whoLikedThePost);

        return (
          <>
            <div className="w-full border bg-white p-5 flex flex-col gap-5 shadow-md rounded">
              <header className="flex items-center gap-3 pb-3 border-b">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    className="w-full h-full"
                    alt=""
                    src={post.user.profilePicture}
                    objectFit="cover"
                    layout="fill"
                  ></Image>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-sm font-semibold">
                    {name} {lastname}
                  </h1>
                  <div className="flex items-center gap-1 text-xs font-medium text-gray-500 text-opacity-80">
                    <h1 className="">{job}</h1>
                    <p className="flex items-center gap-0.5">
                      <GoLocation /> {post.user.country} , {post.user.city}
                    </p>
                  </div>
                </div>
              </header>
              <main className="w-full flex flex-col gap-4">
                <div className="flex w-full max-h-[400px] rounded overflow-hidden ">
                  <div className="relative w-full h-full">
                    <Image
                      src={post.img}
                      objectFit="cover"
                      layout="responsive"
                      width={600}
                      height={400}
                    />
                  </div>
                </div>
                <div className="text-sm text-opacity-70">
                  <p>{post.desc}</p>
                </div>
                <div className="flex items-center justify-between border-y py-3 border-opacity-50">
                  <div className="flex items-center -space-x-1.5 max-w-[200px] overflow-scroll ">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden">
                      <Image
                        className="w-full h-full"
                        alt=""
                        src={post.user.profilePicture}
                        objectFit="cover"
                        layout="fill"
                      ></Image>
                    </div>
                  </div>
                  <div className="flex items-end gap-2 text-2xl">
                    <input ref={ref} value={post.id} className="hidden" />
                    <button
                      onClick={clickLikeButton}
                      className={`${
                        iLike ? "text-primaryBlue" : ""
                      } hover:text-primaryBlue/50`}
                    >
                      <AiFillLike />
                    </button>
                    <span className="text-sm font-bold text-gray-700/70">
                      {post.likes.id.length}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    <p>
                      Comments :<span className="text-textColor/80"> 57</span>
                    </p>
                  </div>
                  <div className="flex flex-col py-2">
                    <div className="w-full flex gap-3 py-3">
                      <div className="">
                        <img
                          className="w-10 h-10 rounded-full "
                          src="https://i.picsum.photos/id/1027/200/200.jpg?hmac=fiXlkLLwYm7JmmU80uRIj9g21XD4q9v_lM_2Z57UhuA"
                          alt="Rounded avatar"
                        />
                      </div>
                      <div className="flex-1 relative flex flex-col gap-1 bg-gray-100 rounded-lg p-3 text-sm">
                        <h1 className="font-bold text-[15px]">Lara Onjova</h1>
                        <p>
                          Simply dummy text of the printing and typesetting
                          industry. Lorem Ipsum has been the industry's standard
                          dummy text ever since the. Lorem Ipsum is simply dummy
                          text of the printing and typesetting industry.
                        </p>
                        <div className="absolute -bottom-2 -right-2">
                          <div className="flex items-center gap-2 rounded-full border py-0.5 px-2 bg-white">
                            <div className="text-xs text-textColor/70 font-bold">
                              <p>8</p>
                            </div>
                            <button className="text-xl text-red-700 hover:text-red-600">
                              <FaHeart />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex gap-3 py-3">
                      <div className="">
                        <img
                          className="w-10 h-10 rounded-full "
                          src="https://images.unsplash.com/photo-1638708644743-2502f38000a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80"
                          alt="Rounded avatar"
                        />
                      </div>
                      <div className="flex-1 relative flex flex-col gap-1 bg-gray-100 rounded-lg p-3 text-sm">
                        <h1 className="font-bold text-[15px]">Nora Kritoma</h1>
                        <p>
                          Simply dummy text of the printing and typesetting
                          industry. Lorem Ipsum has been the industry's standard
                          dummy text ever since the. Lorem Ipsum is simply dummy
                          text of the printing and typesetting industry.
                        </p>
                        <div className="absolute -bottom-2 -right-2">
                          <div className="flex items-center gap-2 rounded-full border py-0.5 px-2 bg-white">
                            <div className="text-xs text-textColor/70 font-bold">
                              <p>12</p>
                            </div>
                            <button className="text-xl text-red-700 hover:text-red-600">
                              <FaHeart />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div>
                    <img
                      className="w-10 h-10 rounded-full "
                      src="https://avatars.githubusercontent.com/u/86301102?v=4"
                      alt="Rounded avatar"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <input
                      placeholder="Post a comment.."
                      className="w-full bg-gray-100/70 px-2 py-1.5 rounded-full placeholder:text-sm"
                    />
                    <div className="absolute bottom-2 right-2 ">
                      <button className="flex items-center text-xl hover:text-primaryBlue">
                        <BiSend />
                      </button>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </>
        );
      })}
    </>
  );
};

export default TimeLinePost;
