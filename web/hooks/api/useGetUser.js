import Axios from "../../lib/axios";
import { useAuth } from "../../states/auth";
import { useQuery } from "react-query";

const useGetUser = () => {
  const { localUser } = useAuth();
  const userId = localUser?._id;

  const {
    isLoading,
    isError,
    data,
    error,
    refetch: timeLineRefetch,
  } = useQuery("getUser", async () => {
    const { data } = await Axios.get(`/users/${userId}`);
    return data;
  });

  return { user: data, isLoading, timeLineRefetch };
};

export default useGetUser;
