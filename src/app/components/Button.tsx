"use client";
import { ReactNode, FC } from "react";
import clsx from "clsx";

interface ButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    children?: ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
    addStyles?: string;
}

const Button: FC<ButtonProps> = ({
    type,
    children,
    onClick,
    secondary,
    danger,
    disabled,
    addStyles,
}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={clsx(
                `flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
                disabled && "opacity-50 cursor-default",
                secondary ? "text-skin-additional" : "text-white",
                danger &&
                "bg-skin-danger hover:bg-skin-danger-hover focus-visible:outline-skin-danger-hover",
                !danger &&
                !secondary &&
                "bg-skin-bg-accent hover:bg-skin-bg-accent-hover focus-visible:outline-sky-600",
                addStyles
            )}
        >
            {children}
        </button>
    );
};

export default Button;
