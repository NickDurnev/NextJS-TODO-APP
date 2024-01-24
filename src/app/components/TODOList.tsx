"use client";

import { FC, useState } from "react";
import { Todo } from "@prisma/client";
import TODOItem from "./TODOItem";
import SideModal from "./SideModal";
import useGetTodos from "../hooks/useGetTodos";

interface IProps {
  data: Todo[];
}

const TODOList: FC<IProps> = ({ data }) => {
  const [isInfoOpened, setIsInfoOpened] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  // const { data, loading } = useGetTodos();

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
    <>
      <div className="w-full flex justify-center xs:px-[10vw] sm:px-[30vw] sm:top-4 text-center">
        {data.map((todo) => (
          <TODOItem key={todo.id} data={todo} onClick={handleOpen} />
        ))}
      </div>
      <SideModal
        data={selectedTodo ?? data[0]}
        isOpen={isInfoOpened}
        onClose={() => setIsInfoOpened(false)}
      />
    </>
  );
};

export default TODOList;
