"use client";

import { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import axios from "@/app/libs/axios";
import { priorityKeys, statusKeys } from "@/app/constants";
import useToast from "@/app/hooks/useToast";
import Button from "@/app/components/Button";
import Select from "@/app/components/inputs/Select";
import Input from "@/app/components/inputs/Input";
import Modal from "./Modal";
import Loader from "./Loader";

interface IProps {
  onClose: () => void;
  isOpen: boolean;
}

const TODOForm: FC<IProps> = ({ onClose, isOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useToast(error);

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      status: { label: statusKeys[0].label, value: statusKeys[0].value },
      priority: { label: priorityKeys[0], value: priorityKeys[0] },
    },
  });

  const status = watch("status");
  const priority = watch("priority");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { title, description, status, priority } = data;

    setIsLoading(true);
    axios
      .post("/todos", {
        status: status?.value,
        priority: priority?.value,
        title,
        description,
      })
      .then(() => {
        reset();
        onClose();
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  };

  const handleCancel = () => {
    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isLoading && <Loader />}
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
                id="description"
                label="Description"
                maxLength={400}
              />
              <Select
                disabled={isLoading}
                label="Status"
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
