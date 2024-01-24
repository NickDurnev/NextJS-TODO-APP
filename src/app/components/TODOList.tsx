"use client";

import { FC, useState } from "react";
import { Todo } from "@prisma/client";
import { Filters } from "../types";
import TODOItem from "./TODOItem";
import SideModal from "./SideModal";
import EmptyState from "./EmptyState";
import useGetTodos from "../hooks/useGetTodos";

interface IProps {
  filters: Filters;
}

const TODOList: FC<IProps> = ({ filters }) => {
  // const [todos, setTodos] = useState<Todo[]>([]);
  const [isInfoOpened, setIsInfoOpened] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const { data, loading } = useGetTodos(filters);

  const handleOpen = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target === e.currentTarget || target.nodeName === "H3") {
      const todoID = e.currentTarget.id;

      const todo = data.find((todo) => todo.id === todoID);
      if (todo) {
        setSelectedTodo(todo);
      }

      setIsInfoOpened(true);
    }
  };

  return (
    <div className="w-full flex justify-center top-20 sm:top-4 text-center">
      {!data.length ? (
        <EmptyState />
      ) : (
        <>
          <ul className="w-full flex flex-col justify-center gap-6 xs:px-[10vw] sm:px-[20vw] md:px-[35vw] sm:top-4 text-center">
            {data.map((todo) => (
              <TODOItem key={todo.id} data={todo} onClick={handleOpen} />
            ))}
          </ul>
          <SideModal
            data={selectedTodo ?? data[0]}
            isOpen={isInfoOpened}
            onClose={() => setIsInfoOpened(false)}
          />
        </>
      )}
    </div>
  );
};

export default TODOList;
