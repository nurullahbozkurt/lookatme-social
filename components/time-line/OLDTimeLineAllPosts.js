import Link from "next/link";
import { memo } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { AiFillLike } from "react-icons/ai";
import { GoLocation } from "react-icons/go";

import Loading from "../Loading";
import Comment from "../Comment";
import userInfo from "../../data/userInfo";
import { useAuth } from "../../states/auth";
import useGetTimeline from "../../hooks/api/useGetTimeline";
import useGetAllPosts from "../../hooks/api/useGettAllPosts";
import { useMutatePostLike } from "../../hooks/api/mutations/useMutatePostLike";
import PictureOfTheLiker from "../PictureOfTheLiker";

const TimeLineAllPosts = () => {
  const { localUser } = useAuth();

  const {
    isLoading,
    data: timeLine,
    refetch: timeLineRefetch,
  } = useGetAllPosts();

  //Mutations
  const { mutateAsync: likePostMutate, isLoading: likePostIsLoading } =
    useMutatePostLike(["timeline"]);

  if (isLoading) return <Loading />;
  return (
    <>
      {timeLine?.map((post, index) => {
        const { name, lastname, job } = userInfo(post.user);

        const dateFormat = new Date(post.createdAt); // dateStr you get from mongodb
        const date = format(dateFormat, "PPpp");

        const iLikePost = post?.likes?.some(
          (like) => like.userId === localUser._id
        );

        return (
          <div
            key={post._id}
            id={post._id}
            className="w-full border bg-white p-5 flex flex-col gap-5 shadow-md rounded"
          >
            <header className="w-full flex items-end justify-between gap-3 pb-3 border-b">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    className="w-full h-full"
                    alt=""
                    src={post?.user?.profilePicture}
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
                      <GoLocation /> {post.country} , {post.city}
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
              <div className="flex items-center justify-between border-y py-1 border-opacity-50">
                <div className="flex items-center -space-x-1.5 max-w-[200px] overflow-scroll ">
                  {post.likes?.map((user) =>
                    user.likedUser?.map((user, index) => (
                      <PictureOfTheLiker key={index} user={user} />
                    ))
                  )}
                </div>
                <div className="flex items-end gap-2 text-2xl">
                  {!likePostIsLoading && (
                    <>
                      <button
                        onClick={async () => {
                          await likePostMutate(post?.id);
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
                        {post.likes?.length}
                      </span>
                    </>
                  )}
                  {likePostIsLoading && (
                    <>
                      <button
                        onClick={async () => {
                          await likePostMutate(post?.id);
                        }}
                        disabled={true}
                        className={"text-primaryBlue/50"}
                      >
                        <div>
                          <AiFillLike />
                        </div>
                      </button>
                      <span className="text-sm font-bold text-gray-700/70">
                        {post.likes?.length}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <Comment timeLineRefetch={timeLineRefetch} comments={post} />
            </main>
          </div>
        );
      })}
    </>
  );
};

export default memo(TimeLineAllPosts);
