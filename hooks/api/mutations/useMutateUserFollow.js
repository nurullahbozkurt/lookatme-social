import { useMutation, useQueryClient } from "react-query";
import Axios from "../../../lib/axios";
import { useAuth } from "../../../states/auth";

const fetchFollow = (userId) => {
  return Axios.put(`/users/${userId}/follow`);
};

export const useMutateUserFollow = (key) => {
  const { localUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation(fetchFollow, {
    onMutate: async (userId) => {
      await queryClient.cancelQueries(key);
      const previousData = await queryClient.getQueryData(key);

      queryClient.setQueryData(key, (oldData) => {
        if (oldData.map((user) => user._id === userId)) {
          return oldData.map((user) => {
            if (
              user.followers.find(
                (follower) => follower.followersId === localUser._id
              )
            ) {
              user.followers = user.followers.filter(
                (follower) => follower.followersId !== localUser._id
              );
              return user;
            }
            user.followers.push({
              followersId: localUser._id,
              myId: userId,
              user: [{ ...localUser }],
            });
            return user;
          });
        }
        if (oldData.map((user) => user._id === localUser._id)) {
          return oldData.map((user) => {
            if (
              user.following.find(
                (following) => following.followingId === userId
              )
            ) {
              user.following = user.following.filter(
                (following) => following.followingId !== userId
              );
              return user;
            }
            user.following.push({
              followingId: userId,
              myId: localUser._id,
              user: [{ ...localUser }],
            });
            return user;
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
