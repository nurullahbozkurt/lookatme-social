import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { AiFillLike } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import Comment from "./Comment";
import Axios from "../lib/axios";
import userInfo from "../data/userInfo";
import { useAuth } from "../states/auth";
import { useMutatePostLike } from "../hooks/api/mutations/useMutatePostLike";
import { useMutation } from "react-query";

const Posts = ({ posts, isLoading, mutateKEY, refetch }) => {
  const { localUser } = useAuth();

  console.log("mutateKEY", mutateKEY);

  const fetchDeletePost = useMutation((id) => {
    return Axios.delete(`/posts/${id}`);
  });

  const deletePost = async (id) => {
    confirmAlert({
      message: "Are you sure ?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await fetchDeletePost.mutateAsync(id);
            refetch();
          },
        },
        {
          label: "No",
          onClick: () => refetch(),
        },
      ],
    });
  };

  //Post Like
  const { mutateAsync: likePostMutate, isLoading: likePostIsLoading } =
    useMutatePostLike(mutateKEY);

  return (
    <>
      {!isLoading &&
        posts.map((post, index) => {
          const myPost = post.userId === localUser._id;
          const postImg = post?.img !== process.env.IMAGE_URL;
          console.log("mePost", myPost);
          const dateFormat = new Date(post?.createdAt); // dateStr you get from mongodb
          const date = format(dateFormat, "PPpp");
          const { name, lastname, job } = userInfo(post?.user);
          const iLikePost = post?.likes.some(
            (like) => like.userId === localUser._id
          );

          return (
            <div
              key={index}
              id={post?._id}
              className="relative w-full border bg-white p-5 flex flex-col gap-5 shadow-md rounded"
            >
              {myPost && (
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => deletePost(post?._id)}
                    className="text-[15px] hover:text-black"
                  >
                    <RiDeleteBin6Fill />
                  </button>
                </div>
              )}

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
                    <Link
                      href={`/profile/${post.user.username}`}
                      className="text-sm font-semibold"
                    >
                      <a className="font-semibold">
                        {name} {lastname}
                      </a>
                    </Link>
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
                {postImg && (
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
                )}
                <div className="text-sm text-opacity-70">
                  <p>{post?.desc}</p>
                </div>
                <div className="flex items-center justify-between border-y py-1 border-opacity-50">
                  <div className="flex items-center -space-x-1.5 max-w-[200px] overflow-scroll ">
                    {post?.likes?.map((user, index) =>
                      user.likedUser?.map((user) => {
                        return (
                          <div key={index}>
                            <Link href={`/profile/${user?.username}`}>
                              <a>
                                <div className="relative w-7 h-7 rounded-full overflow-hidden">
                                  <Image
                                    className="w-full h-full"
                                    alt=""
                                    src={user.profilePicture}
                                    objectFit="cover"
                                    layout="fill"
                                  ></Image>
                                </div>
                              </a>
                            </Link>
                          </div>
                        );
                      })
                    )}
                  </div>
                  <div className="flex items-end gap-2 text-2xl">
                    <button
                      onClick={async () => {
                        await likePostMutate(post?._id);
                      }}
                      disabled={likePostIsLoading}
                      className={`${iLikePost ? "text-primaryBlue" : ""} ${
                        likePostIsLoading ? "text-primaryBlue/50" : ""
                      } hover:text-primaryBlue/50`}
                    >
                      <div>
                        <AiFillLike />
                      </div>
                    </button>
                    <span className="text-sm font-bold text-gray-700/70">
                      {post?.likes?.length}
                    </span>
                  </div>
                </div>
                <Comment refetch={refetch} post={post} mutateKEY={mutateKEY} />
              </main>
            </div>
          );
        })}
    </>
  );
};

export default memo(Posts);
