import { FC, ReactNode } from "react";
import clsx from "clsx";

interface IProps {
  onClick: () => void;
  isActive?: boolean;
  children: ReactNode;
}

const IconButton: FC<IProps> = ({ onClick, isActive, children }) => {
  console.log(isActive);
  return (
    <button
      onClick={onClick}
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
