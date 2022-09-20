import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import ReactLoading from "react-loading";
import { FaHeart } from "react-icons/fa";
import { useMutation } from "react-query";
import { AiFillCloseCircle } from "react-icons/ai";

import Axios from "../lib/axios";
import userInfo from "../data/userInfo";
import { useAuth } from "../states/auth";
import useGetUser from "../hooks/api/useGetUser";
import PictureOfTheCommenter from "./PictureOfTheCommenter";
import { useMutateCommentLike } from "../hooks/api/mutations/useMutateCommentLike";

const Comment = ({ post, refetch, mutateKEY }) => {
  const { localUser } = useAuth();

  const { user } = useGetUser(localUser?._id);

  const [comment, setComment] = useState({
    postId: null,
    comment: null,
  });
  //Mutations
  const { mutateAsync: likeCommentMutate, isLoading: likeCommentIsLoading } =
    useMutateCommentLike(mutateKEY);

  // fetch functions
  const fetchCommentDelete = useMutation((id) => {
    return Axios.delete(`/posts/${id.id}/comment`, id);
  });

  const fetchComment = useMutation(() => {
    return Axios.post(`/posts/${comment.postId}/comment`, {
      comment: comment.comment,
    });
  });

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
      <div className="flex items-center gap-3 text-sm font-semibold">
        <p>
          Comments :
          <span className="text-textColor/80"> {post.comments.length}</span>
        </p>
        <div>
          {" "}
          {(fetchCommentDelete.isLoading || likeCommentIsLoading) && (
            <div>
              <ReactLoading
                type={"spin"}
                color={"#0089BA"}
                height={20}
                width={20}
              />
            </div>
          )}{" "}
        </div>
      </div>
      {post.comments.map((comment, index) => {
        const { name, lastname } = userInfo(comment.user[0]);
        const myComment = comment.userWhoCommentedId === localUser._id;

        const iLikeComment = comment?.commentLikes.some((like) => {
          return like?.userId === localUser?._id;
        });

        // const [iLike, setILike] = useState(iLikeComment ? iLikeComment : null);
        // console.log("ilike", iLike);

        return (
          <div key={comment.id}>
            <div className="flex flex-col ">
              <div className="w-full items-center flex gap-3">
                <div className="group flex-1 relative flex flex-col gap-1 bg-gray-100 rounded-lg px-3 py-1 text-sm">
                  <div className="flex items-center justify-between ">
                    <Link
                      href={`/profile/${comment.user[0].username}`}
                      className="font-bold text-[15px] "
                    >
                      <a className="font-semibold hover:text-black">
                        {name} {lastname}
                      </a>
                    </Link>
                    {myComment && (
                      <button
                        onClick={async () => {
                          await fetchCommentDelete.mutateAsync({
                            id: comment.id,
                          });
                          refetch();
                        }}
                        className="hidden group-hover:block text-red-700 text-lg z-10"
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
                      <button
                        onClick={async () => {
                          await likeCommentMutate(comment.id);
                          refetch();
                        }}
                        className={`${
                          iLikeComment ? "text-red-700" : ""
                        } text-xl  hover:text-red-700/50`}
                      >
                        <FaHeart />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="">
                  {myComment && (
                    <PictureOfTheCommenter
                      link={comment.user[0].username}
                      profilePic={comment.user[0].profilePicture}
                    />
                  )}
                  {!myComment && (
                    <PictureOfTheCommenter
                      link={comment.user[0].username}
                      profilePic={comment.user[0].profilePicture}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex items-center gap-5">
        {user && (
          <div className={`relative w-10 h-10 rounded-full overflow-hidden`}>
            <Image
              className="w-full h-full"
              alt=""
              src={user?.profilePicture}
              objectFit="cover"
              layout="fill"
            />
          </div>
        )}
        <form className="flex-1 relative">
          <input
            onChange={(e) =>
              setComment({
                ...comment,
                comment: e.target.value,
                postId: post.id,
              })
            }
            value={comment?.comment || ""}
            placeholder={`Post a comment..`}
            className="w-full bg-gray-100/70 px-2 py-1.5 rounded-full placeholder:text-sm"
          />
          <div className="absolute flex items-center gap-2 bottom-2 right-2 ">
            {fetchComment.isLoading && (
              <ReactLoading
                type={"spin"}
                color={"#0089BA"}
                height={20}
                width={20}
              />
            )}

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
    </>
  );
};

export default Comment;
