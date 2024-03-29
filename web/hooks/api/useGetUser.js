import Axios from "../../lib/axios";
import { useAuth } from "../../states/auth";
import { useQuery } from "react-query";
import { useMemo } from "react";

const useGetUser = (user) => {
  //const { localUser } = useAuth();
  const userId = useMemo(() => {
    return user;
  }, [user]);

  const {
    isLoading,
    isError,
    data,
    error,
    refetch: timeLineRefetch,
  } = useQuery(
    "getUser",
    async () => {
      const { data } = await Axios.get(`/users/${userId}`);
      return data;
    },

    {
      refetchOnMount: false,
    }
  );

  return { user: data, isLoading, timeLineRefetch };
};

export default useGetUser;
