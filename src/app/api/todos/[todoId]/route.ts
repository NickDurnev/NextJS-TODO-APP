import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import { errors } from "@/app/constants";
import { Todo } from "@prisma/client";

interface IParams {
  todoId: string;
}

async function handler(request: Request, { params }: { params: IParams }) {
  try {
    const { todoId } = params;

    const existingTodo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    if (!existingTodo) {
      return new NextResponse(
        errors.INVALID_ID.message,
        errors.INVALID_ID.status
      );
    }

    if (request.method === "DELETE") {
      return await DELETE(request, {
        todoId,
      });
    }

    if (request.method === "PATCH") {
      return await PATCH(request, {
        todoId,
        existingTodo,
      });
    }
  } catch (error) {
    console.log(error, "ERROR_MESSAGE_DELETE");
    return new NextResponse(
      errors.INTERNAL_ERROR.message,
      errors.INTERNAL_ERROR.status
    );
  }
}

async function DELETE(request: Request, { todoId }: { todoId: string }) {
  const deletedTodo = await prisma.todo.delete({
    where: {
      id: todoId,
    },
  });

  return NextResponse.json(deletedTodo);
}

async function PATCH(
  request: Request,
  { todoId, existingTodo }: { todoId: string; existingTodo: Todo }
) {
  const body = await request.json();
  const { createdAt, title, description, status, priority } = existingTodo;

  const updatedTodo = await prisma.todo.update({
    where: {
      id: todoId,
    },
    data: {
      createdAt,
      title,
      description,
      status,
      priority,
      ...body,
    },
  });

  return NextResponse.json(updatedTodo);
}

export { handler as PATCH, handler as DELETE };
