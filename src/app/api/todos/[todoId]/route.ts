import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import { errors } from "@/app/constants";

interface IParams {
  todoId: string;
}

// interface IArguments {
//   id: string;
//   lastMessageId: string | null;
//   users: PartialUser[];
//   messageId?: string;
//   currentUserId?: string;
// }

async function handler(request: Request, { params }: { params: IParams }) {
  console.log("REQUEST", request);
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

    // if (request.method === "PATCH") {
    //   return await PATCH(request, {
    //     id,
    //     lastMessageId,
    //     users,
    //     messageId,
    //     currentUserId: currentUser.id,
    //   });
    // }
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

// async function PATCH(
//   request: Request,
//   { id, messageId, currentUserId }: IArguments
// ) {
//   const body = await request.json();
//   const { message, image } = body;

//   const updatedMessage = await prisma.message.update({
//     where: {
//       id: messageId,
//     },
//     include: {
//       sender: {
//         ...UserSelector,
//       },
//       seen: {
//         ...UserSelector,
//       },
//     },
//     data: {
//       body: message,
//       image: image,
//       editedAt: new Date().toISOString(),
//       seen: {
//         connect: {
//           id: currentUserId,
//         },
//       },
//     },
//   });

//   return NextResponse.json(updatedMessage);
// }

export { handler as PATCH, handler as DELETE };
