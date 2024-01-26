import { FC, useState } from "react";
import clsx from "clsx";
import { IoTrash } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { Todo, TODOStatus } from "@prisma/client";
import IconButton from "./buttons/IconButton";
import SideModal from "./SideModal";

interface IProps {
  data: Todo;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, data: { [key: string]: string | number }) => void;
  setMutation: (data: any) => void;
}

const TODOItem: FC<IProps> = ({ data, handleDelete, handleUpdate, setMutation }) => {
  const [isInfoOpened, setIsInfoOpened] = useState(false);
  const { title, id, status } = data;
  const isDone = status === TODOStatus.DONE;

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target === e.currentTarget || target.nodeName === "H3") {
      setIsInfoOpened(true);
    }
  };

  return (
    <>
      <li
        id={id}
        onClick={handleClick}
        className="flex justify-between items-center gap-4 p-2 sm:p-4 bg-skin-additional hover:bg-skin-hover rounded-md cursor-pointer transition"
      >
        <IconButton
          onClick={() => handleUpdate(id, { status: TODOStatus.DONE })}
          isDone={isDone}
        >
          <FaCheck size={20} />
        </IconButton>
        <h3
          className={clsx("text-skin-base truncate", isDone && "line-through")}
        >
          {title}
        </h3>
        <IconButton onClick={() => handleDelete(id)}>
          <IoTrash size={20} />
        </IconButton>
      </li>
      <SideModal
        data={data}
        isOpen={isInfoOpened}
        onClose={() => setIsInfoOpened(false)}
        setMutation={setMutation}
      />
    </>
  );
};

export default TODOItem;
