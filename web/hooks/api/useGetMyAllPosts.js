import Axios from "../../lib/axios";
import { useQuery } from "react-query";

const useMyPosts = (userId) => {
  const { data, isLoading, refetch, isFetching } = useQuery(
    ["useGetMyAllPosts", userId],
    async () => {
      const { data } = await Axios.get(`/posts/${userId && userId}/user-posts`);
      return data;
    },
    {
      refetchOnMount: false,
    }
  );

  return { myPost: data, isLoading, refetch, isFetching };
};

export default useMyPosts;
