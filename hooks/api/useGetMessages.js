import Axios from "../../lib/axios";
import { useQuery } from "react-query";

const useGetMessages = (conversationId) => {
  const getMessages = async () => {
    return await Axios.get(`/messages/${conversationId}`);
  };

  const { data, isLoading, refetch } = useQuery(
    ["messages", conversationId],
    getMessages
  );
  return { data, isLoading, refetch };
};
export default useGetMessages;
