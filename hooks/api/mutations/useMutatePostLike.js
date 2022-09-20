import { useMutation, useQueryClient } from "react-query";
import Axios from "../../../lib/axios";
import { useAuth } from "../../../states/auth";

const fetchLike = (id) => {
  return Axios.put(`/posts/${id}/like`);
};

export const useMutatePostLike = (key) => {
  const { localUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation(fetchLike, {
    onMutate: async (data) => {
      await queryClient.cancelQueries(key);
      const previousData = await queryClient.getQueryData(key);

      queryClient.setQueryData(key, (oldData) => {
        if (oldData.map((post) => post._id === data)) {
          return oldData.map((post) => {
            if (post.likes.find((like) => like.userId === localUser._id)) {
              post.likes = post.likes.filter(
                (like) => like.userId !== localUser._id
              );
              return post;
            }
            post.likes.push({
              userId: localUser._id,
              postId: post._id,
              likedUser: [{ ...localUser }],
            });
            return post;
          });
        }
      });
      return { previousData };
    },
    onError: (err, data, context) => {
      queryClient.setQueryData(key, context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(key);
    },
  });
};
