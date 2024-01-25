import { FC, useState } from "react";
import { IoTrash } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { Todo, TODOStatus } from "@prisma/client";
import IconButton from "./IconButton";
import SideModal from "./SideModal";

interface IProps {
  data: Todo;
  handleDelete: (id: string) => void;
}

const TODOItem: FC<IProps> = ({ data, handleDelete }) => {
  const [isInfoOpened, setIsInfoOpened] = useState(false);
  const { title, id, status } = data;

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
          onClick={() => console.log('UPDATE')}
          isActive={status === TODOStatus.DONE}
        >
          <FaCheck size={20} />
        </IconButton>
        <h3 className="text-skin-base truncate">{title}</h3>
        <IconButton onClick={() => handleDelete(id)}>
          <IoTrash size={20} />
        </IconButton>
      </li >
      <SideModal
        data={data}
        isOpen={isInfoOpened}
        onClose={() => setIsInfoOpened(false)}
      />
    </>
  );
};

export default TODOItem;
