"use client";

import { FC } from "react";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label?: string;
  id: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  maxLength: number;
  errors: FieldErrors;
  disabled?: boolean;
  addSTyles?: string;
}

const Input: FC<InputProps> = ({
  label,
  id,
  required,
  register,
  maxLength,
  errors,
  disabled,
  addSTyles,
}) => {
  return (
    <div>
      <label
        className="relative block text-sm font-medium leading-6 text-skin-additional"
        htmlFor={id}
      >
        {label}
        <div className="mt-2">
          <textarea
            id={id}
            autoComplete="off"
            maxLength={maxLength}
            disabled={disabled}
            {...register(id, {
              required,
            })}
            className={clsx(
              `
            form-input
            block 
            w-full 
            rounded-md 
            border-0 
            py-1.5 
            text-skin-additional 
            shadow-sm 
            ring-1 
            ring-inset 
            ring-skin-additional
            placeholder:text-skin-additional
            bg-skin-main 
            focus:ring-2 
            focus:ring-inset 
            sm:text-sm 
            sm:leading-6
            resize-none`,
              errors[id] ? "focus:ring-rose-500" : "focus:ring-sky-600",
              disabled && "opacity-50 cursor-default",
              addSTyles
            )}
          />{" "}
        </div>
      </label>
      {errors[id] && (
        <p className="mt-1 text-rose-500 text-sm">{`${errors[id]?.message}`}</p>
      )}
    </div>
  );
};

export default Input;
