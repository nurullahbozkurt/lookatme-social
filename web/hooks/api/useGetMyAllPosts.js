import Axios from "../../lib/axios";
import { useQuery } from "react-query";

const useMyPosts = (userId) => {
  console.log("userId", userId);
  const { data, isLoading, refetch } = useQuery(
    ["useGetMyAllPosts", userId],
    async () => {
      const { data } = await Axios.get(`/posts/${userId}/user-posts`);
      return data;
    }
  );

  return { myPost: data, isLoading, refetch };
};

export default useMyPosts;
