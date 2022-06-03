import Post from "../Post";
import CreatePost from "./CreatePost";

const TimeLine = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <CreatePost />
      <Post />
      {/* <Post /> */}
    </div>
  );
};

export default TimeLine;
