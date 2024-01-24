import { NextResponse } from "next/server";
import { NextApiRequest } from "next";

import prisma from "@/app/libs/prismadb";
import { errors } from "@/helpers/responseVariants";
import { ORDER_BY, ORDER_TYPE, PAGESIZE } from "@/app/constants";
import { TODOStatus } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const page = request.nextUrl.searchParams.get("page") ?? "1";
    const pageSize = request.nextUrl.searchParams.get("pageSize") ?? "10";
    const search = request.nextUrl.searchParams.get("search") ?? "";
    const orderBy = request.nextUrl.searchParams.get("orderBy");
    const orderType =
      request.nextUrl.searchParams.get("orderType") ?? ORDER_TYPE[0];
    const status =
      request.nextUrl.searchParams.get("status") ?? TODOStatus.TO_DO;

    // Convert page and pageSize to numeric values
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);

    const sanitizedOrderBy = ORDER_BY.includes(orderBy as string)
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
