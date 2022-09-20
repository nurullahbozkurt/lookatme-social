import { useMutation, useQueryClient } from "react-query";

import Axios from "../../../lib/axios";
import { useAuth } from "../../../states/auth";

const fetchCommentLike = (id) => {
  return Axios.post(`/posts/${id}/comment-like`);
};

export const useMutateCommentLike = (key) => {
  const { localUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation(fetchCommentLike, {
    onMutate: async (data) => {
      await queryClient.cancelQueries(key);
      const previousData = await queryClient.getQueryData(key);

      queryClient.setQueryData(key, (oldData) => {
        return oldData.map((post) => {
          const comment = post.comments.find((comment) => comment._id === data);

          if (!comment) {
            return post;
          }

          if (
            !comment.commentLikes.find((like) => like.userId === localUser._id)
          ) {
            comment.commentLikes.push([
              { userId: localUser._id, commentId: data },
            ]);
          } else {
            comment.commentLikes = comment.commentLikes.filter(
              (l) => l.userId !== localUser._id
            );
          }

          return post;
        });
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
