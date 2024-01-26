import { TODOStatus } from "@prisma/client";

export const filterEnumKeys = [
  "ALL",
  TODOStatus.TO_DO,
  TODOStatus.DONE,
  TODOStatus.IN_PROGRESS,
];

export const FILTER = filterEnumKeys.map((status) => ({
  value: status,
  label: status.replace(/_/g, " "),
}));

export const STATUS = FILTER.slice(1);

export const ORDER_BY = ["createdAt", "priority"];

export const ORDER_TYPE = ["desc", "asc"];

export const PRIORITY = Array.from({ length: 10 }, (_, index) => index + 1);

export const errors = {
  INVALID_PARAMS: { message: "Invalid parameters", status: { status: 400 } },
  INVALID_ID: { message: "Invalid ID", status: { status: 400 } },
  MISSING_INFO: { message: "Missing info", status: { status: 400 } },
  INTERNAL_ERROR: { message: "Internal Error", status: { status: 500 } },
};
