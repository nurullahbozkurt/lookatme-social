import PostTimeLine from "../PostTimeLine";
import CreatePost from "./CreatePost";

const TimeLine = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <CreatePost />
      <PostTimeLine />
    </div>
  );
};

export default TimeLine;
