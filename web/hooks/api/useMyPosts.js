import React, { useEffect, useState } from "react";
import Axios from "../../lib/axios";
import { useMutation } from "react-query";
import { useAuth } from "../../states/auth";

const useMyPosts = () => {
  const { user, userLoaded } = useAuth();
  const [myPosts, setMyPosts] = useState(null);
  const userId = user._id;

  if (user && !userLoaded) {
    const getMyPosts = useMutation(() => {
      return Axios.get(`/posts/${userId}/user-posts`);
    });

    useEffect(() => {
      const fetchMyPosts = async () => {
        const res = await getMyPosts.mutateAsync();
        setMyPosts(res.data);
      };
      fetchMyPosts();
    }, [userId]);
  }
  return { myPosts };
};

export default useMyPosts;
