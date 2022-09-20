import Axios from "../../lib/axios";
import { useQuery } from "react-query";

const useGetSearchUser = (query) => {
  const { data, isLoading, refetch, isError } = useQuery("search", async () => {
    const { data } = await Axios.get(`/users/search/${query}`);
    return data;
  });
  return { data, isLoading, refetch, isError };
};
export default useGetSearchUser;
