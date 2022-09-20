import Image from "next/image";
import Link from "next/link";
import { AiFillLike } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import useGetMyAllPosts from "../../hooks/api/useGetMyAllPosts";
import Loading from "../Loading";
import { useAuth } from "../../states/auth";
import { useMemo } from "react";
import { memo } from "react";

const MyAllPostsCard = () => {
  const { localUser } = useAuth();
  const userId = useMemo(() => {
    return localUser?._id;
  }, [localUser?._id]);

  const { myPost, isLoading } = useGetMyAllPosts(userId);

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <div className="w-full h-full ">
      <div className="border bg-white p-5 flex flex-col gap-5 shadow-md rounded">
        <div className="w-full font-semibold">
          <div className="flex items-center gap-1">
            <h1>My Posts</h1>
            <div className="rounded-full flex items-center justify-center bg-primaryGreen text-white p-0.5 w-5 h-5">
              <p className="text-xs"> {myPost?.length}</p>
            </div>
          </div>
        </div>
        <div className="w-full overflow-x-scroll flex gap-5  ">
          {myPost?.map((post) => (
            <div
              key={post?._id}
              className="relative group min-w-[210px] h-[190px] overflow-hidden cursor-pointer rounded group-hover:text-gray-200 shadow-avatarShadow "
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  className="w-full h-full"
                  alt=""
                  src={post.img}
                  objectFit="cover"
                  layout="fill"
                ></Image>
              </div>
              <div className="absolute top-0 bottom-0 right-0 left-0 bg-gray-900/80 hover:bg-gray-900/70 ">
                <Link href={`/#${post._id}`} scroll={false}>
                  <div className="h-full flex flex-col  justify-between p-3">
                    <div className="flex items-center gap-2 font-bold text-primaryBlue">
                      <div className="text-lg">
                        <GoLocation />
                      </div>
                      <h1 className="text-base  ">{post.city}</h1>
                    </div>
                    <div className="flex items-end justify-end text-primaryBlue text-2xl">
                      <AiFillLike />
                      <span className="text-sm font-bold ">
                        {post.likes.length}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default memo(MyAllPostsCard);
