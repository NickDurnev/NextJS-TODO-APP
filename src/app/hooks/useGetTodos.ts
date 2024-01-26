import { useEffect, useRef, useState } from "react";
import axios from "@/app/libs/axios";
import { Todo } from "@prisma/client";
import { ORDER_BY, ORDER_TYPE, PAGESIZE } from "@/app/constants";
import getToast from "@/app/libs/toast";

interface Params {
  page?: number;
  pageSize?: number;
  search?: string;
  orderBy?: string;
  orderType?: string;
  status?: string;
  mutation: any;
}

const useGetTodos = ({
  page = 1,
  pageSize = PAGESIZE,
  search = "",
  orderBy = ORDER_BY[0],
  orderType = ORDER_TYPE[0],
  status,
  mutation,
}: Params) => {
  const [data, setData] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const pageRef = useRef(1);
  const isLastPageRef = useRef(false);

  useEffect(() => {
    if (isLastPageRef.current && pageRef.current > 1) {
      console.log("Last");
      return;
    }
    const fetchData = async () => {
      try {
        const {
          data: { todos, isLastPage },
        } = await axios.get(
          `todos?page=${page}&pageSize=${pageSize}&search=${search}&orderBy=${orderBy}&orderType=${orderType}&status=${status}`
        );

        if (isLastPage) {
          isLastPageRef.current = isLastPage;
        }

        if (pageRef.current === page) {
          setData(todos);
          return;
        }
        setData((prev) => [...prev, ...todos]);
      } catch (error: any) {
        getToast(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    pageRef.current = page;
  }, [orderBy, orderType, page, pageSize, search, status, mutation]);

  return {
    data,
    setData,
    loading,
  };
};

export default useGetTodos;
