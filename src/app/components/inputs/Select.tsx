"use client";

import { FC } from "react";
import { FieldErrors } from "react-hook-form";
import ReactSelect, { ActionMeta, MultiValue, SingleValue } from "react-select";

interface SelectProps {
  label?: string;
  value?: Record<string, any>;
  errors?: FieldErrors;
  id?: string;
  onChange: (
    newValue:
      | MultiValue<Record<string, any>>
      | SingleValue<Record<string, any>>,
    actionMeta: ActionMeta<Record<string, any>>
  ) => void;
  options: Record<string, any>[];
  disabled?: boolean;
  isMulti?: boolean;
}

const Select: FC<SelectProps> = ({
  label,
  value,
  errors,
  id,
  onChange,
  options,
  disabled,
  isMulti = false,
}) => {
  return (
    <div className="z-[100]">
      {label && (
        <label className="block text-sm font-medium leading-6 text-skin-additional">
          {label}
        </label>
      )}
      <div className="mt-2 capitalize">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti={isMulti}
          options={options}
          menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
          styles={{
            menuPortal: (base: object) => ({
              ...base,
              zIndex: 9999,
              textTransform: "capitalize",
            }),
            control: (base: object) => ({
              ...base,
              background: "#2c2a2a",
              borderColor: "#605f5e",
            }),
            menuList: (base: object) => ({
              ...base,
              background: "#2c2a2a",
            }),
            option: (base: object) => ({
              ...base,
              background: "#2c2a2a",
              color: "#605f5e",
              "&:hover": {
                color: "#d4d6dd",
              },
            }),
            multiValueLabel: (base: object) => ({
              ...base,
              color: "#605f5e",
            }),
            dropdownIndicator: (base: object) => ({
              ...base,
              color: "#605f5e",
              "&:hover": {
                color: "#d4d6dd",
              },
            }),
            indicatorSeparator: (base: object) => ({
              ...base,
              backgroundColor: "var(--color-border-main)",
            }),
            group: (base: object) => ({
              ...base,
              color: "#605f5e",
            }),
            singleValue: (base: object) => ({
              ...base,
              color: "#605f5e",
            }),
          }}
          classNames={{
            control: () => "text-sm",
          }}
        />
      </div>
      {errors && id && errors[id] && (
        <p className="mt-1 text-rose-500 text-sm">{`${errors[id]?.message}`}</p>
      )}
    </div>
  );
};

export default Select;
