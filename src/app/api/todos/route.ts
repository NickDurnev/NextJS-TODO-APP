import { NextResponse, NextRequest } from "next/server";
import { TODOStatus } from "@prisma/client";

import prisma from "@/app/libs/prismadb";
import { ORDER_BY, ORDER_TYPE, FILTER, errors } from "@/app/constants";

export async function GET(request: NextRequest) {
  try {
    const search = request.nextUrl.searchParams.get("search") ?? "";
    const orderBy = request.nextUrl.searchParams.get("orderBy");
    const orderType =
      request.nextUrl.searchParams.get("orderType") ?? ORDER_TYPE[0];
    const status = request.nextUrl.searchParams.get("status");

    const sanitizedStatus = status === FILTER[0].value ? null : status;
    const sanitizedOrderBy = ORDER_BY.includes(orderBy as string)
      ? orderBy
      : "createdAt";

    const todos = await prisma.todo.findMany({
      where: {
        OR: [
          { title: { contains: search as string, mode: "insensitive" } },
          { description: { contains: search as string, mode: "insensitive" } },
        ],
        ...(sanitizedStatus ? { status: sanitizedStatus as TODOStatus } : {}),
      },
      orderBy: {
        [sanitizedOrderBy as string]: orderType,
      },
    });

    return NextResponse.json({
      todos,
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
