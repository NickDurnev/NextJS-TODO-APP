import { NextResponse } from "next/server";
import { NextApiRequest } from "next";

import prisma from "@/app/libs/prismadb";
import { errors } from "@/helpers/responseVariants";
import { orderByKeys } from "@/app/constants";
import { TODOStatus } from "@prisma/client";

export async function GET(request: NextApiRequest) {
  try {
    const {
      page = 1,
      pageSize = 10,
      search = "",
      orderBy,
      orderType = "desc",
      status = TODOStatus.TO_DO,
    } = request.query;

    // Convert page and pageSize to numeric values
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);

    if (
      isNaN(pageNumber) ||
      isNaN(pageSizeNumber) ||
      pageNumber <= 0 ||
      pageSizeNumber <= 0
    ) {
      return new NextResponse(
        errors.INVALID_PARAMS.message,
        errors.INVALID_PARAMS.status
      );
    }

    const sanitizedOrderBy = orderByKeys.includes(orderBy as string)
      ? orderBy
      : "createdAt";

    const skip = (pageNumber - 1) * pageSizeNumber;

    const todos = await prisma.todo.findMany({
      where: {
        OR: [
          { title: { contains: search as string, mode: "insensitive" } },
          { description: { contains: search as string, mode: "insensitive" } },
        ],
        status: status as TODOStatus,
      },
      skip,
      take: pageSizeNumber,
      orderBy: {
        [sanitizedOrderBy as string]: orderType,
      },
    });

    const totalTodos = await prisma.todo.count();

    return NextResponse.json({
      todos,
      totalTodos,
    });
  } catch (error: any) {
    console.error(error, "ERROR_MESSAGES");
    return new NextResponse(
      errors.INTERNAL_ERROR.message,
      errors.INTERNAL_ERROR.status
    );
  }
}
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body) {
      return new NextResponse(
        errors.MISSING_INFO.message,
        errors.MISSING_INFO.status
      );
    }

    const newTodo = await prisma.todo.create({
      data: {
        ...body,
      },
    });

    return NextResponse.json(newTodo);
  } catch (error: any) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse(
      errors.INTERNAL_ERROR.message,
      errors.INTERNAL_ERROR.status
    );
  }
}
