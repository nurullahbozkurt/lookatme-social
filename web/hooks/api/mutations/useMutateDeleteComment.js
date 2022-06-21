import { useMutation, useQueryClient } from "react-query";

import Axios from "../../../lib/axios";
import { useAuth } from "../../../states/auth";

const fetchDeleteComment = (id) => {
  return Axios.post(`/posts/${id}/comment`);
};

export const useMutateDeleteComment = (key) => {
  console.log("key", key);
  const queryClient = useQueryClient();
  return useMutation(fetchDeleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(key);
    },
    onError: () => {},
  });
};
