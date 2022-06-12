import Axios from "../../lib/axios";
import { useQuery } from "react-query";

const useGetAllUser = () => {
  const { data, isLoading, refetch } = useQuery("useGetAllUser", async () => {
    const { data } = await Axios.get("/users/all-users");
    return data;
  });
  return { data, isLoading, refetch };
};

export default useGetAllUser;
