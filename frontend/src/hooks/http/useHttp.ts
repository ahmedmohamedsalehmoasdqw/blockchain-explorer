import axios, { AxiosResponse, CancelTokenSource } from "axios";
import { toast } from "react-toastify";

const useHttp = () => {
  const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const post = async <T>(
    url: string,
    data: any,
    cancelToken?: CancelTokenSource
  ): Promise<T | null> => {
    try {
      const response: AxiosResponse<T> = await client.post<T>(url, data, {
        cancelToken: cancelToken?.token,
      });

      return response.data;
    } catch (error: any) {
      await handleError(error);
      return null;
    }
  };

  const handleError = async (error: any) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          toast.error("Invalid input. Please review and try again.");
          break;
        case 500:
          toast.error("Server error. Please try again later.");
          break;
        default:
          toast.error("Oops! An error occurred. Please try again.");
      }
    } else {
      toast.error("Network error. Check your internet connection.");
    }
  };

  return {
    post,
    handleError,
  };
};

export default useHttp;
