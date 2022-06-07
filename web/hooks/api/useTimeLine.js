import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../../states/auth";
import Axios from "../../lib/axios";

const useTimeLine = () => {
  const [timeLine, setTimeLine] = useState(null);
  const { user, userLoaded } = useAuth();
  const userId = user._id;

  const {
    isLoading,
    isError,
    data,
    error,
    refetch: timeLineRefetch,
  } = useQuery("timeline", async () => {
    const { data } = await Axios.get(`/posts/${userId}/my-timeline`);
    return data;
  });

  useEffect(() => {
    setTimeLine(data);
  }, [data]);

  return { timeLine, timeLineRefetch };
};

export default useTimeLine;
