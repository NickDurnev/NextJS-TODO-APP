import Todo from "@prisma/client";

export type PartialTodo = Pick<
  Todo,
  "title" | "description" | "priority" | "status"
>;
