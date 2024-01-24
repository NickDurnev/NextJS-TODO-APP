"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { statusKeys, priorityKeys, orderByKeys } from "../constants";
import Select from "./inputs/Select";
import { useEffect } from "react";

const FiltersBar = ({ isLoading = false }) => {
    const { handleSubmit, setValue, watch } = useForm<FieldValues>({
        defaultValues: {
            status: { label: statusKeys[0], value: statusKeys[0] },
            priority: { label: priorityKeys[0], value: priorityKeys[0] },
            orderBy: { label: orderByKeys[0], value: orderByKeys[0] },
        },
    });

    useEffect(() => {
        const subscription = watch(() => handleSubmit(onSubmit)());
        return () => subscription.unsubscribe();
    }, [handleSubmit, watch]);

    const status = watch("status");
    const priority = watch("priority");
    const orderBy = watch("orderBy");

    const onSubmit: SubmitHandler<FieldValues> = ({
        status,
        priority,
        orderBy,
    }) => {
        const filters = {
            status: status.value,
            priority: priority.value,
            orderBy: orderBy.value,
        };
        console.log(filters);
        // setFilters(filters);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ul className="flex align-center w-96 mx-auto justify-between p-4 border-t-[1px] border-skin-main ">
                <li className="text-center">
                    <p className="text-skin-base text-sm">Status:</p>
                    <Select
                        disabled={isLoading}
                        options={statusKeys.map((status) => ({
                            value: status,
                            label: status,
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
                <li className="text-center">
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
            </ul>
        </form>
    );
};

export default FiltersBar;