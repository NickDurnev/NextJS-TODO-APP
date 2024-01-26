import toast from "react-hot-toast";
import { AxiosError } from "axios";

const getToast = (error: AxiosError | null) => {
  const responseData = error?.response?.data;

  if (!responseData) {
    return;
  }

  if (error?.response?.status === 500) {
    toast.error("Something went wrong!");
    return;
  }

  if (typeof responseData === "string") {
    toast.error(responseData);
  }
};

export default getToast;
