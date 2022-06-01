import PostModalContent from "./MyAllPosts";

export default function MyAllPostsCard() {
  console.log("MyAllPostsCard");
  return (
    <div className="w-full h-full ">
      <div className="border bg-white p-5 flex flex-col gap-5 shadow-md rounded">
        <div className="w-full font-semibold">
          <h1>Latest Posts</h1>
        </div>
        <div className="w-full overflow-x-scroll flex gap-5  ">
          <PostModalContent />
          <PostModalContent />
          <PostModalContent />
          <PostModalContent />
        </div>
      </div>
    </div>
  );
}
