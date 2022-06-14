import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../../states/auth";
import Axios from "../../lib/axios";

const useGetTimeline = () => {
  const { localUser, userLoaded } = useAuth();
  const userId = localUser._id;

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

  return { timeLine: data, timeLineRefetch, isLoading };
};

export default useGetTimeline;
