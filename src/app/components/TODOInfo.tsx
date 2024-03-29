import { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { format } from "date-fns";

import { Todo } from "@prisma/client";
import axios from "../libs/axios";
import getToast from "../libs/toast";
import { PRIORITY, STATUS } from "@/app/constants";

import Select from "@/app/components/inputs/Select";
import Input from "@/app/components/inputs/Input";

interface IProps {
  data: Todo;
  submitRef: any;
  setMutation: (data: any) => void;
}

const TODOInfo: FC<IProps> = ({ data, submitRef, setMutation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { id, title, description, status, priority, createdAt } = data;
  const formattedDate = format(new Date(createdAt), "PP");

  const {
    formState: { errors, isDirty },
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      title,
      description,
      status: { label: status.replace(/_/g, " "), value: status },
      priority: { label: priority, value: priority },
    },
  });

  const statusValue = watch("status");
  const priorityValue = watch("priority");

  const onSubmit: SubmitHandler<FieldValues> = ({
    title,
    description,
    status,
    priority,
  }) => {
    const formData = {
      status: status?.value,
      priority: priority?.value,
      title,
      description,
    };

    const isDirtyStatus = status?.value !== data.status;
    const isDirtyPriority = priority?.value !== data.priority;

    if (isDirty || isDirtyStatus || isDirtyPriority) {
      setIsLoading(true);
      axios
        .patch(`/todos/${id}`, formData)
        .then(() => {
          setMutation(data);
        })
        .catch((error) => {
          getToast(error);
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative mt-6 flex-1 px-4 sm:px-6 ">
        <div className="flex-col items-center gap-6">
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="title"
            maxLength={100}
            addSTyles="pb-14 text-skin-additional ring-1 focus:ring-0"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            id="description"
            maxLength={400}
            addSTyles="pb-14 text-skin-additional ring-1 focus:ring-0"
          />
          <div className="flex-col justify-start px-4 gap-8">
            <div className="flex justify-left align-center p-2">
              <p className="text-sm w-20 pt-4 font-medium text-skin-additional capitalize">
                Status:
              </p>
              <Select
                disabled={isLoading}
                id="status"
                options={STATUS.map(({ label, value }) => ({
                  value: value,
                  label: label,
                }))}
                onChange={(value) =>
                  setValue("status", value, {
                    shouldValidate: true,
                  })
                }
                value={statusValue}
              />
            </div>
            <div className="flex justify-left align-center p-2">
              <p className="text-sm w-20 pt-4 font-medium text-skin-additional capitalize">
                Priority:
              </p>
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
                value={priorityValue}
              />
            </div>
            <div className="flex justify-left align-center p-2">
              <p className="text-sm w-20 font-medium text-skin-additional capitalize">
                createdAt:
              </p>
              <p className="text-sm text-skin-base sm:col-span-2 capitalize">
                {formattedDate}
              </p>
            </div>
          </div>
        </div>
      </div>
      <button ref={submitRef} type="submit" className="hidden" />
    </form>
  );
};

export default TODOInfo;
