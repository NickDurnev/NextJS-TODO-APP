"use client";

import { FC, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { FILTER, ORDER_BY, ORDER_TYPE } from "../constants";
import Select from "./inputs/Select";
import IconButton from "./buttons/IconButton";

interface IProps {
  setFilters: (filters: { status: string; orderBy: string }) => void;
}

const FiltersBar: FC<IProps> = ({ setFilters }) => {
  const { handleSubmit, setValue, watch } = useForm<FieldValues>({
    defaultValues: {
      status: { label: FILTER[0].label, value: FILTER[0].value },
      orderBy: { label: ORDER_BY[0], value: ORDER_BY[0] },
      orderType: ORDER_TYPE[0],
    },
  });

  useEffect(() => {
    const subscription = watch(() => handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);

  const status = watch("status");
  const orderBy = watch("orderBy");
  const orderType = watch("orderType");

  const onSubmit: SubmitHandler<FieldValues> = ({
    status,
    orderBy,
    orderType,
  }) => {
    const filters = {
      status: status.value,
      orderBy: orderBy.value,
      orderType,
    };
    setFilters(filters);
  };

  const changeOrderType = () => {
    return orderType === ORDER_TYPE[0]
      ? setValue("orderType", ORDER_TYPE[1], { shouldValidate: true })
      : setValue("orderType", ORDER_TYPE[0], { shouldValidate: true });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex align-center w-full sm:w-[450px] mx-auto justify-between p-4 border-[1px] border-skin-main rounded-md"
    >
      <div key="status" className="min-w-[120px] md:min-w-[160px] text-center">
        <p className="text-skin-base text-sm">Status:</p>
        <Select
          options={FILTER.map(({ label, value }) => ({
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
      </div>
      <div key="orderBy" className="min-w-[120px] md:min-w-[160px] text-center">
        <p className="text-skin-base text-sm">Order by:</p>
        <Select
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
      </div>
      <div key="orderType" className="pt-6">
        <IconButton onClick={changeOrderType}>
          {orderType === ORDER_TYPE[0] ? (
            <FaArrowDown size={20} />
          ) : (
            <FaArrowUp size={20} />
          )}
        </IconButton>
      </div>
    </form>
  );
};

export default FiltersBar;
