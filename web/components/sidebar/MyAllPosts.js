import { AiFillLike } from "react-icons/ai";
import { GoLocation } from "react-icons/go";

const MyAllPosts = () => {
  return (
    <>
      <div className="relative min-w-[210px] h-[190px] overflow-hidden rounded cursor-pointer ">
        <img
          className=""
          src={
            "https://www.wallsticker.com.my/image/wallsticker/image/cache/data/all_product_images/product-1828/r1-420x420.JPG"
          }
          alt="Rounded avatar"
        />
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-gray-900/80 hover:bg-gray-900/60 ">
          <div className="h-full flex flex-col  justify-between p-3">
            <div className="flex items-center gap-2 font-bold text-primaryBlue">
              <div className="text-lg">
                <GoLocation />
              </div>
              <h1 className="text-base ">Turkey, Istanbul</h1>
            </div>
            <div className="flex items-end justify-end text-primaryBlue text-2xl">
              <AiFillLike />
              <span className="text-sm font-bold">17</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAllPosts;
