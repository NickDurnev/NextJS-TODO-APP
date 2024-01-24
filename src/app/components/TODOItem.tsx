import { FC } from "react";
import { IoTrash } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { TODO, TODOStatus } from "@prisma/client";
import IconButton from "./IconButton";

interface IProps {
  data: TODO;
  onClick: (e: React.MouseEvent) => void;
}

const TODOItem: FC<IProps> = ({ data, onClick }) => {
  const { title, id, status } = data;

  return (
    <div
      id={id}
      onClick={onClick}
      className="flex justify-between items-center gap-4 p-2 sm:p-4 bg-skin-additional hover:bg-skin-hover rounded-md cursor-pointer transition"
    >
      <IconButton
        onClick={() => console.log("delete")}
        isActive={status === TODOStatus.DONE}
      >
        <FaCheck size={20} />
      </IconButton>
      <h3 className="text-skin-base truncate">{title}</h3>
      <IconButton onClick={() => console.log("delete")}>
        <IoTrash size={20} />
      </IconButton>
    </div>
  );
};

export default TODOItem;
