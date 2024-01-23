"use client";

import { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { TODOStatus } from "@prisma/client";
import Button from "@/app/components/Button";
import Select from "@/app/components/inputs/Select";
import Input from "@/app/components/inputs/Input";
import Modal from "./Modal";

interface IProps {
  onClose: () => void;
  isOpen: boolean;
}

const statusKeys = [TODOStatus.TO_DO, TODOStatus.DONE, TODOStatus.IN_PROGRESS];

const priorityKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const TODOForm: FC<IProps> = ({ onClose, isOpen }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    formState: { errors, isDirty },
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      status: { label: TODOStatus.TO_DO, value: TODOStatus.TO_DO },
      priority: { label: priorityKeys[0], value: priorityKeys[0] },
    },
  });

  const status = watch("status");
  const priority = watch("priority");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setIsLoading(true);

    reset();
    onClose();
    setIsLoading(false);
    if (isDirty) {
      toast.success("Settings updated");
    }
  };

  const handleCancel = () => {
    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="pb-12 space-y-4">
            <h2 className="text-base font-semibold leading-7 text-skin-base">
              Describe your task
            </h2>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                id="title"
                label="Title"
                maxLength={100}
              />
              <Input
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                id="description"
                label="Description"
                maxLength={400}
              />
              <Select
                disabled={isLoading}
                label="Status"
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
              <Select
                disabled={isLoading}
                label="Priority"
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
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              disabled={isLoading}
              secondary
              onClick={handleCancel}
              type="button"
            >
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default TODOForm;
