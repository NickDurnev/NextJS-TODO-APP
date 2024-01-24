"use client";

import { FC, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { STATUS, PRIORITY, ORDER_BY, ORDER_TYPE } from "../constants";
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
      status: { label: STATUS[0].label, value: STATUS[0].value },
      priority: { label: PRIORITY[0], value: PRIORITY[0] },
      orderBy: { label: ORDER_BY[0], value: ORDER_BY[0] },
      orderType: ORDER_TYPE[0],
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
    return id === ORDER_TYPE[0]
      ? setValue("orderType", ORDER_TYPE[1], { shouldValidate: true })
      : setValue("orderType", ORDER_TYPE[0], { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul className="flex align-center w-full sm:w-[500px] mx-auto justify-between p-4 border-[1px] border-skin-main rounded-md">
        <li key="status" className="min-w-[160px] text-center">
          <p className="text-skin-base text-sm">Status:</p>
          <Select
            disabled={isLoading}
            options={STATUS.map(({ label, value }) => ({
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
        <li key="priority" className="text-center">
          <p className="text-skin-base text-sm">Priority:</p>
          <Select
            disabled={isLoading}
            options={PRIORITY.map((priority) => ({
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
        <li key="orderBy" className="min-w-[160px] text-center">
          <p className="text-skin-base text-sm">Order by:</p>
          <Select
            disabled={isLoading}
            options={ORDER_BY.map((orderBy) => ({
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
        <li key="orderType" className="pt-6">
          <IconButton
            disabled={isLoading}
            onClick={(e, id) => changeOrderType(e, id)}
            id={orderType}
          >
            {orderType === ORDER_TYPE[0] ? (
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
