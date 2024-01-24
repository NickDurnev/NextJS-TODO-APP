import { useEffect, useState } from "react";
import axios from "@/app/libs/axios";
import { TODOStatus } from "@prisma/client";
import { ORDER_BY, ORDER_TYPE, PAGESIZE } from "@/app/constants";
import { Params } from "@/app/types";

const useGetTodos = ({
  page = 1,
  pageSize = PAGESIZE,
  search = "",
  orderBy = ORDER_BY[0],
  orderType = ORDER_TYPE[0],
  status = TODOStatus.TO_DO,
}: Params) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { todos },
        } = await axios.get(
          `todos?page=${page}&pageSize=${pageSize}&search=${search}&orderBy=${orderBy}&orderType=${orderType}&status=${status}`
        );
        setData((prev) => [...prev, ...todos]);
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
