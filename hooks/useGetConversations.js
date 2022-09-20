import Axios from "../lib/axios";
import { useQuery } from "react-query";

const useGetConversations = () => {
  const getConversation = async () => {
    return await Axios.get(`/conversations`);
  };

  const { data, isLoading, refetch } = useQuery(
    "conversations",
    getConversation
  );
  return { data, isLoading, refetch };
};
export default useGetConversations;
