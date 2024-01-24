import { TODOStatus } from "@prisma/client";

export const statusEnumKeys = [
  TODOStatus.TO_DO,
  TODOStatus.DONE,
  TODOStatus.IN_PROGRESS,
];

export const statusKeys = statusEnumKeys.map((status) => ({
  value: status,
  label: status.replace(/_/g, " "),
}));

export const orderByKeys = ["createdAt", "status", "priority"];
export const orderTypeKeys = ["desc", "asc"];

export const priorityKeys = Array.from({ length: 10 }, (_, index) => index + 1);
