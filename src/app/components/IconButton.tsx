import { FC, ReactNode } from "react";
import clsx from "clsx";

interface IProps {
  onClick: (id?: string) => void;
  isActive?: boolean;
  id?: string;
  children: ReactNode;
}

const IconButton: FC<IProps> = ({ onClick, isActive, id, children }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (id) {
      onClick(e, id);
    }
  };
  return (
    <button
      onClick={id ? handleClick : onClick}
      type="button"
      className={clsx(
        "flex items-center justify-center w-10 h-10 text-skin-base bg-skin-bg-accent hover:bg-skin-bg-accent-hover hover:scale-125 rounded-full transition",
        isActive ? "bg-skin-active" : ""
      )}
    >
      {children}
    </button>
  );
};

export default IconButton;
