import Image from "next/image";
import { BiSend } from "react-icons/bi";
import { FiImage } from "react-icons/fi";
import ReactLoading from "react-loading";
import { useMutation } from "react-query";
import { GoLocation } from "react-icons/go";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState, useRef, useEffect } from "react";

import { memo } from "react";
import Axios from "../../lib/axios";
import LocalSelect from "./LocalSelect";
import { useAuth } from "../../states/auth";
import { useTimeline } from "../../states/timeline";
import useGetTimeline from "../../hooks/api/useGetTimeline";

const CreatePost = () => {
  const ref = useRef();

  const { localUser } = useAuth();
  const userId = localUser?._id;

  const { location } = useTimeline();

  const { timeLineRefetch } = useGetTimeline();

  const [locationSelect, setLocationSelect] = useState(false);
  const [image, setImage] = useState(null);
  const imgURL = image ? URL.createObjectURL(image) : null;

  const [post, setPost] = useState({
    userId: userId,
    desc: "",
    img: "",
    country: "",
    city: "",
  });

  const handleClick = () => {
    ref.current.click();
  };

  const handleSetImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPost({ ...post, img: `${file.name}` });
  };
  const handleRefresh = (event) => {
    const { target = {} } = event || {};
    target.value = "";
  };

  const deleteImg = () => {
    setImage(null);
    setPost({ ...post, img: "" });
  };

  const fetchPost = useMutation(() => {
    return Axios.post("/posts", post);
  });

  const fetchImage = useMutation(() => {
    let formData = new FormData();
    formData.append("file", image);
    return Axios.post("/upload", formData);
  });

  const uploadPost = async (e) => {
    if (image) {
      try {
        await fetchImage.mutateAsync();
        setImage(null);
      } catch (err) {
        console.log(err);
      }
      try {
        await fetchPost.mutateAsync();
        setPost({ ...post, desc: "", img: "" });
        timeLineRefetch();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await fetchPost.mutateAsync();
        timeLineRefetch();
      } catch (err) {
        console.log(err);
      }
    }
  };

  //useEffects
  useEffect(() => {
    setPost({ ...post, country: location.country, city: location.city });
  }, [location]);

  return (
    <div>
      <div className="w-full border bg-white p-5 flex flex-col gap-5 shadow-md rounded">
        <div className="flex flex-col gap-2">
          <div>
            <textarea
              onChange={(e) => setPost({ ...post, desc: e.target.value })}
              value={post.desc}
              placeholder="Type something .."
              className="w-full p-3 rounded-md bg-gray-100"
            />
          </div>
          <div className="flex items-center justify-between text-primaryBlue text-[22px]">
            <div className="flex items-center gap-[14px]">
              <div className="flex items-center justify-center">
                <div className="hover:text-primaryGreen flex items-center">
                  {!image && (
                    <button onClick={handleClick}>
                      <FiImage />
                    </button>
                  )}

                  {image && (
                    <>
                      <div className="relative group">
                        <div className="relative w-10 h-10 rounded overflow-hidden">
                          <Image
                            className="w-full h-full"
                            alt=""
                            src={imgURL}
                            objectFit="cover"
                            layout="fill"
                            width={600}
                            height={350}
                          />
                        </div>
                        <button
                          onClick={deleteImg}
                          className="absolute hidden group-hover:block  -top-2 -right-2 rounded-full text-white text-xs p-1 bg-red-800"
                        >
                          <RiDeleteBin5Line />
                        </button>
                      </div>
                    </>
                  )}
                </div>
                <input
                  onChange={handleSetImage}
                  onClick={handleRefresh}
                  ref={ref}
                  type="file"
                  className="hidden"
                />
              </div>
              <button
                onClick={() => setLocationSelect(!locationSelect)}
                className="hover:text-primaryGreen"
              >
                <GoLocation />
              </button>
              {locationSelect && <LocalSelect />}

              {(fetchImage.isLoading || fetchPost.isLoading) && (
                <div>
                  <ReactLoading
                    type={"spin"}
                    color={"#0089BA"}
                    height={20}
                    width={20}
                  />
                </div>
              )}
            </div>

            <button
              onClick={uploadPost}
              className="flex items-center gap-1 rounded-md text-white bg-primaryBlue text-sm px-3 py-1.5 hover:bg-primaryGreen"
            >
              <span>Send</span>
              <BiSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CreatePost);
