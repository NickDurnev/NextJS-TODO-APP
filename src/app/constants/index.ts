import { TODOStatus } from "@prisma/client";

const enumKeys = [TODOStatus.TO_DO, TODOStatus.DONE, TODOStatus.IN_PROGRESS];

export const statusKeys = enumKeys.map((status) => status.replace(/_/g, " "));
export const orderByKeys = ["desc", "asc"];
export const priorityKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
