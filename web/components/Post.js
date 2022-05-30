import { AiFillLike } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import { GoLocation } from "react-icons/go";

const TimeLinePost = () => {
  return (
    <div className="w-full border bg-white p-5 flex flex-col gap-5 shadow-md rounded">
      <header className="flex items-center gap-3 pb-3 border-b">
        <div>
          <img
            className="w-12 h-12 rounded-full "
            src="https://avatars.githubusercontent.com/u/86301102?v=4"
            alt="Rounded avatar"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold">Nurullah Bozkurt</h1>
          <div className="flex items-center gap-1 text-xs font-medium text-gray-500 text-opacity-80">
            <h1 className="">React Developer</h1>
            <p className="flex items-center gap-0.5">
              <GoLocation /> Turkey, Istanbul
            </p>
          </div>
        </div>
      </header>
      <main className="w-full flex flex-col gap-4">
        <div className="flex w-full max-h-[400px] rounded overflow-hidden ">
          <img
            className="w-full h-full object-cover"
            src="https://global-uploads.webflow.com/5e0ac69bad6badc677c5db21/60c030214d19547a7c6e74e9_n2Ai81S_aciRuuCqe7oCiQ5a1sVM5lekh6ZzHgACdLaF-h7HbkrlNSn_McFL9DASwsZGEspjN0edxhYfrQ64mVbWq7Jjd6qtJBOoYh6MYGc7Tmg9AtswIQfv0AZGFkihUmwlHMgJ.jpeg"
          />
        </div>
        <div className="text-sm text-opacity-70">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500
          </p>
        </div>
        <div className="flex items-center justify-between border-y py-3 border-opacity-50">
          <div className="flex items-center -space-x-1.5 max-w-[200px] overflow-scroll ">
            <img
              className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="flex items-end gap-2 text-2xl">
            <button className=" hover:text-primaryBlue">
              <AiFillLike />
            </button>
            <span className="text-sm font-bold text-gray-700/70">123</span>
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
                  Simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the. Lorem Ipsum is simply dummy text of the printing
                  and typesetting industry.
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
                  Simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the. Lorem Ipsum is simply dummy text of the printing
                  and typesetting industry.
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
  );
};

export default TimeLinePost;
