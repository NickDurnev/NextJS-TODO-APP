import { FC, ReactNode } from "react";
import clsx from "clsx";

interface IProps {
  onClick: () => void;
  isDone?: boolean;
  children: ReactNode;
}

const IconButton: FC<IProps> = ({ onClick, isDone, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={isDone}
      type="button"
      className={clsx(
        "flex items-center justify-center w-10 h-10 text-skin-base bg-skin-bg-accent hover:bg-skin-bg-accent-hover hover:scale-125 rounded-full transition",
        isDone && "bg-skin-done hover:bg-skin-done"
      )}
    >
      {children}
    </button>
  );
};

export default IconButton;
