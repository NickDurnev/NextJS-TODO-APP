import { TODOStatus } from "@prisma/client";

const statusEnumKeys = [
  TODOStatus.TO_DO,
  TODOStatus.DONE,
  TODOStatus.IN_PROGRESS,
];

export const STATUS = statusEnumKeys.map((status) => ({
  value: status,
  label: status.replace(/_/g, " "),
}));

export const ORDER_BY = ["createdAt", "status", "priority"];

export const ORDER_TYPE = ["desc", "asc"];

export const PRIORITY = Array.from({ length: 10 }, (_, index) => index + 1);

export const PAGESIZE = 10;
