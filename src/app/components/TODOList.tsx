"use client";

import { FC, useState } from "react";
import axios from "@/app/libs/axios";

import getToast from "@/app/libs/toast";
import useGetTodos from "@/app/hooks/useGetTodos";

import TODOItem from "@/app/components/TODOItem";
import EmptyState from "@/app/components/EmptyState";
import Loader from "@/app/components/Loader";

interface IProps {
  filters: {
    status: string;
    orderBy: string;
  };
  search: string;
  mutation: any;
  setMutation: (mutation: any) => void;
}

const TODOList: FC<IProps> = ({ filters, search, mutation, setMutation }) => {
  const { data, setData, loading } = useGetTodos({
    ...filters,
    search,
    mutation,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id: string) => {
    setIsLoading(true);
    axios
      .delete(`/todos/${id}`)
      .then(({ data }) => {
        setData((prev) => prev.filter((todo) => todo.id !== data.id));
      })
      .catch((error) => {
        getToast(error);
      })
      .finally(() => setIsLoading(false));
  };

  const handleUpdate = (
    id: string,
    data: { [key: string]: string | number }
  ) => {
    setIsLoading(true);
    axios
      .patch(`/todos/${id}`, data)
      .then(({ data }) => {
        setMutation(data);
      })
      .catch((error) => {
        getToast(error);
      })
      .finally(() => setIsLoading(false));
  };

  if (isLoading || loading) {
    return <Loader />;
  }

  return (
    <div className="w-full flex justify-center top-20 sm:top-4 text-center">
      {!data.length ? (
        <EmptyState />
      ) : (
        <ul className="w-full flex flex-col justify-center gap-6 xs:px-[10vw] sm:px-[20vw] md:px-[35vw] sm:top-4 text-center">
          {data.map((todo) => (
            <TODOItem
              key={todo.id}
              data={todo}
              handleDelete={(id) => handleDelete(id)}
              handleUpdate={(id, data) => handleUpdate(id, data)}
              setMutation={(data) => setMutation(data)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TODOList;
