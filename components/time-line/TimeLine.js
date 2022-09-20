import CreatePost from "./CreatePost";
import TimeLinePosts from "./TimeLinePosts";

const TimeLine = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <CreatePost />
      <TimeLinePosts />
    </div>
  );
};

export default TimeLine;
