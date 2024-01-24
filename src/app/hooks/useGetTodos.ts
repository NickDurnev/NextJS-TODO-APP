import { useEffect, useState } from "react";
import axios from "@/app/libs/axios";
import { TODOStatus } from "@prisma/client";

interface IParams {
  page?: number;
  pageSize?: number;
  search?: string;
  orderBy?: string;
  orderType?: "asc" | "desc";
  status?: TODOStatus;
}

const useGetTodos = ({
  page = 1,
  pageSize = 10,
  search = "",
  orderBy,
  orderType = "desc",
  status = TODOStatus.TO_DO,
}: IParams) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `todos?page=${page}&pageSize=${pageSize}&search=${search}&orderBy=${orderBy}&orderType=${orderType}&status=${status}`
        );
        setData(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [orderBy, orderType, page, pageSize, search, status]);

  return {
    data,
    loading,
  };
};

export default useGetTodos;
