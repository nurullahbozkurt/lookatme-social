import { useQuery } from "react-query";
import Axios from "../../lib/axios";

const useGetAllPosts = () => {
  const { isLoading, isError, data, error, refetch } = useQuery(
    "allPosts",
    async () => {
      const { data } = await Axios.get(`/posts/allposts`);
      return data;
    },

    {
      refetchOnMount: false,
    }
  );

  return { data, isLoading, refetch };
};

export default useGetAllPosts;
