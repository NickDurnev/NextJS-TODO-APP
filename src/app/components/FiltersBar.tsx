"use client";

import { FC, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import {
  statusKeys,
  priorityKeys,
  orderByKeys,
  orderTypeKeys,
} from "../constants";
import { Filters } from "../types";
import Select from "./inputs/Select";
import IconButton from "./IconButton";

interface IProps {
  isLoading: boolean;
  setFilters: (filters: Filters) => void;
}

const FiltersBar: FC<IProps> = ({ isLoading, setFilters }) => {
  const { handleSubmit, setValue, watch } = useForm<FieldValues>({
    defaultValues: {
      status: { label: statusKeys[0].label, value: statusKeys[0].value },
      priority: { label: priorityKeys[0], value: priorityKeys[0] },
      orderBy: { label: orderByKeys[0], value: orderByKeys[0] },
      orderType: orderTypeKeys[0],
    },
  });

  useEffect(() => {
    const subscription = watch(() => handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);

  const status = watch("status");
  const priority = watch("priority");
  const orderBy = watch("orderBy");
  const orderType = watch("orderType");

  const onSubmit: SubmitHandler<FieldValues> = ({
    status,
    priority,
    orderBy,
    orderType,
  }) => {
    const filters = {
      status: status.value,
      priority: priority.value,
      orderBy: orderBy.value,
      orderType,
    };
    setFilters(filters);
  };

  const changeOrderType = (e, id) => {
    return id === "desc"
      ? setValue("orderType", "asc", { shouldValidate: true })
      : setValue("orderType", "desc", { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul className="flex align-center w-full sm:w-[500px] mx-auto justify-between p-4 border-[1px] border-skin-main rounded-md">
        <li className="min-w-[160px] text-center">
          <p className="text-skin-base text-sm">Status:</p>
          <Select
            disabled={isLoading}
            options={statusKeys.map(({ label, value }) => ({
              value: value,
              label: label,
            }))}
            onChange={(value) =>
              setValue("status", value, {
                shouldValidate: true,
              })
            }
            value={status}
          />
        </li>
        <li className="text-center">
          <p className="text-skin-base text-sm">Priority:</p>
          <Select
            disabled={isLoading}
            options={priorityKeys.map((priority) => ({
              value: priority,
              label: priority,
            }))}
            onChange={(value) =>
              setValue("priority", value, {
                shouldValidate: true,
              })
            }
            value={priority}
          />
        </li>
        <li className="min-w-[160px] text-center">
          <p className="text-skin-base text-sm">Order by:</p>
          <Select
            disabled={isLoading}
            options={orderByKeys.map((orderBy) => ({
              value: orderBy,
              label: orderBy,
            }))}
            onChange={(value) =>
              setValue("orderBy", value, {
                shouldValidate: true,
              })
            }
            value={orderBy}
          />
        </li>
        <li className="pt-6">
          <IconButton
            disabled={isLoading}
            onClick={(e, id) => changeOrderType(e, id)}
            id={orderType}
          >
            {orderType === "desc" ? (
              <FaArrowDown size={20} />
            ) : (
              <FaArrowUp size={20} />
            )}
          </IconButton>
        </li>
      </ul>
    </form>
  );
};

export default FiltersBar;
