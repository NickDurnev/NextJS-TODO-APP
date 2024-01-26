import { useEffect, useState } from "react";
import { Todo } from "@prisma/client";

import axios from "@/app/libs/axios";
import getToast from "@/app/libs/toast";
import { ORDER_BY, ORDER_TYPE } from "@/app/constants";

interface Params {
  search?: string;
  orderBy?: string;
  orderType?: string;
  status?: string;
  mutation: any;
}

const useGetTodos = ({
  search = "",
  orderBy = ORDER_BY[0],
  orderType = ORDER_TYPE[0],
  status,
  mutation,
}: Params) => {
  const [data, setData] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { todos },
        } = await axios.get(
          `todos?search=${search}&orderBy=${orderBy}&orderType=${orderType}&status=${status}`
        );

        setData(todos);
      } catch (error: any) {
        getToast(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderBy, orderType, search, status, mutation]);

  return {
    data,
    setData,
    loading,
  };
};

export default useGetTodos;
