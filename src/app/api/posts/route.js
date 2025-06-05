import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const POST_PER_PAGE = 2;

    const categories = await prisma.category.findMany({
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (page - 1),
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (err) {
    console.error("Database Error:", err);
    return NextResponse.json(
      { message: "Something went wrong!", error: err.message },
      { status: 500 }
    );
  }
};
