import React, { useEffect, useMemo } from "react";
import Axios from "../../lib/axios";
import { useQuery } from "react-query";
import { useAuth } from "../../states/auth";

const useMyPosts = () => {
  const { localUser } = useAuth();
  const userId = useMemo(() => {
    return localUser?.id;
  }, [localUser]);

  const { data, isLoading } = useQuery("useGetMyAllPosts", async () => {
    const { data } = await Axios.get(`/posts/${userId}/user-posts`);
    return data;
  });

  return { myPosts: data, isLoading };
};

export default useMyPosts;
