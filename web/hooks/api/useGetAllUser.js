import Axios from "../../lib/axios";
import { useQuery } from "react-query";

const useGetAllUser = () => {
  const { data, isLoading, refetch } = useQuery(
    "getAllUser",
    async () => {
      const { data } = await Axios.get("/users/all-users");
      return data;
    },
    {
      refetchOnMount: false,
    }
  );
  return { data, isLoading, refetch };
};

export default useGetAllUser;
