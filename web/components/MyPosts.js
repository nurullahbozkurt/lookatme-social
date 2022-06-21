import Image from "next/image";
import { useState, memo } from "react";
import { BiSend } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { useMutation } from "react-query";
import { AiFillLike } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

import Axios from "../lib/axios";
import { format } from "date-fns";
import { useAuth } from "../states/auth";
import userInfo from "../data/userInfo";
import useGetMyAllPosts from "../hooks/api/useGetMyAllPosts";
import { useMutatePostLike } from "../hooks/api/mutations/useMutatePostLike";
import { useMutateCommentLike } from "../hooks/api/mutations/useMutateCommentLike";

const MyPosts = ({ userId }) => {
  const { localUser } = useAuth();

  const [comment, setComment] = useState({
    postId: null,
    comment: null,
  });

  const { myPost, isLoading, refetch, isFetching } = useGetMyAllPosts(userId);

  //Mutations
  const { mutateAsync: likePostMutate, isLoading: likePostIsLoading } =
    useMutatePostLike(["getMyAllPosts", userId]);

  const { mutateAsync: likeCommentMutate, isLoading: likeCommentIsLoading } =
    useMutateCommentLike(["getMyAllPosts", userId]);

  //Fetching
  const fetchCommentDelete = useMutation((id) => {
    return Axios.delete(`/posts/${id.id}/comment`);
  });

  const fetchComment = useMutation(() => {
    return Axios.post(`/posts/${comment.postId}/comment`, {
      comment: comment.comment,
    });
  });

  console.log("fetchComment", fetchComment.isLoading, fetchComment.isLoading);

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      await fetchComment.mutateAsync();
      setComment({
        postId: null,
        comment: "",
      });
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!isLoading &&
        myPost.map((post, index) => {
          const dateFormat = new Date(post?.createdAt); // dateStr you get from mongodb
          const date = format(dateFormat, "PPpp");
          const { name, lastname, job } = userInfo(post?.user);
          const iLikePost = post?.likes.some(
            (like) => like.userId === localUser._id
          );

          return (
            <>
              <div
                key={index}
                id={post?._id}
                className="w-full border bg-white p-5 flex flex-col gap-5 shadow-md rounded"
              >
                <header className="w-full flex items-end justify-between gap-3 pb-3 border-b">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        className="w-full h-full"
                        alt=""
                        src={post?.user.profilePicture}
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
                          <GoLocation /> {post?.country} , {post?.city}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs">{date}</div>
                </header>
                <main className="w-full flex flex-col gap-4">
                  <div className="flex w-full max-h-[400px] rounded overflow-hidden ">
                    <div className="relative w-full h-full">
                      <Image
                        src={post?.img}
                        objectFit="cover"
                        layout="responsive"
                        width={600}
                        height={400}
                      />
                    </div>
                  </div>
                  <div className="text-sm text-opacity-70">
                    <p>{post?.desc}</p>
                  </div>
                  <div className="flex items-center justify-between border-y py-3 border-opacity-50">
                    <div className="flex items-center -space-x-1.5 max-w-[200px] overflow-scroll ">
                      {post?.likes?.map((user, index) =>
                        user.likedUser?.map((user) => {
                          return (
                            <>
                              <div
                                key={index}
                                className="relative w-7 h-7 rounded-full overflow-hidden"
                              >
                                <Image
                                  className="w-full h-full"
                                  alt=""
                                  src={user.profilePicture}
                                  objectFit="cover"
                                  layout="fill"
                                ></Image>
                              </div>
                            </>
                          );
                        })
                      )}
                    </div>
                    <div className="flex items-end gap-2 text-2xl">
                      {!likePostIsLoading && (
                        <>
                          <button
                            onClick={async () => {
                              await likePostMutate(post?._id);
                            }}
                            className={`${
                              iLikePost ? "text-primaryBlue" : ""
                            } hover:text-primaryBlue/50`}
                          >
                            <div>
                              <AiFillLike />
                            </div>
                          </button>
                          <span className="text-sm font-bold text-gray-700/70">
                            {post?.likes?.length}
                          </span>
                        </>
                      )}
                      {likePostIsLoading && (
                        <>
                          <button
                            onClick={async () => {
                              await likePostMutate(post?._id);
                            }}
                            disabled={true}
                            className={"text-primaryBlue/50"}
                          >
                            <div>
                              <AiFillLike />
                            </div>
                          </button>
                          <span className="text-sm font-bold text-gray-700/70">
                            {post?.likes?.length}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-sm font-semibold">
                    <p>
                      Comments :
                      <span className="text-textColor/80">
                        {" "}
                        {post?.comments.length}
                      </span>
                    </p>
                  </div>
                  {post?.comments.map((comment, index) => {
                    const { name, lastname } = userInfo(comment.user[0]);
                    const meComment =
                      comment.userWhoCommentedId === localUser._id;

                    const iLikeComment = comment.commentLikes.some((like) => {
                      return like.userId === localUser._id;
                    });

                    return (
                      <>
                        <div key={index}>
                          <div className="flex flex-col ">
                            <div className="w-full items-center flex gap-3">
                              <div className="">
                                {!meComment && (
                                  <div
                                    className={`relative w-10 h-10 rounded-full overflow-hidden`}
                                  >
                                    <Image
                                      className="w-full h-full"
                                      alt=""
                                      src={comment.user[0].profilePicture}
                                      objectFit="cover"
                                      layout="fill"
                                    ></Image>
                                  </div>
                                )}
                              </div>
                              <div className="group flex-1 relative flex flex-col gap-1 bg-gray-100 rounded-lg p-3 text-sm">
                                <div className="flex items-center justify-between">
                                  <h1 className="font-bold text-[15px]">
                                    {name} {lastname}
                                  </h1>
                                  {meComment && (
                                    <button
                                      onClick={async () => {
                                        await fetchCommentDelete.mutateAsync({
                                          id: comment._id,
                                        });
                                        refetch();
                                      }}
                                      className="hidden group-hover:block text-red-700 text-lg"
                                    >
                                      <AiFillCloseCircle />
                                    </button>
                                  )}
                                </div>
                                <p>{comment.comment}</p>
                                <div className="absolute -bottom-2 -right-2">
                                  <div className="flex items-center gap-2 rounded-full border py-0.5 px-2 bg-white">
                                    <div className="text-xs text-textColor/70 font-bold">
                                      <p>{comment.commentLikes.length}</p>
                                    </div>
                                    {
                                      <button
                                        onClick={async () => {
                                          await likeCommentMutate(comment._id);
                                        }}
                                      >
                                        <div
                                          className={`${
                                            iLikeComment ? "text-red-700" : ""
                                          } text-xl  hover:text-red-700/50`}
                                        >
                                          <FaHeart />
                                        </div>
                                      </button>
                                    }
                                  </div>
                                </div>
                              </div>
                              <div className="">
                                {meComment && (
                                  <div
                                    className={` relative w-10 h-10 rounded-full overflow-hidden`}
                                  >
                                    <Image
                                      className="w-full h-full"
                                      alt=""
                                      src={comment.user[0].profilePicture}
                                      objectFit="cover"
                                      layout="fill"
                                    ></Image>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                  <div className="flex items-center gap-5">
                    <div>
                      <img
                        className="w-10 h-10 rounded-full "
                        src="https://avatars.githubusercontent.com/u/86301102?v=4"
                        alt="Rounded avatar"
                      />
                    </div>
                    <form className="flex-1 relative">
                      <input
                        onChange={(e) =>
                          setComment({
                            ...comment,
                            comment: e.target.value,
                            postId: post?.id,
                          })
                        }
                        value={comment?.comment}
                        placeholder="Post a comment.."
                        className="w-full bg-gray-100/70 px-2 py-1.5 rounded-full placeholder:text-sm"
                      />
                      <div className="absolute bottom-2 right-2 ">
                        <button
                          type="submit"
                          onClick={(e) => sendComment(e)}
                          className="flex items-center text-xl hover:text-primaryBlue"
                        >
                          <BiSend />
                        </button>
                      </div>
                    </form>
                  </div>
                </main>
              </div>
            </>
          );
        })}
    </>
  );
};

export default memo(MyPosts);
