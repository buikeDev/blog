import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// Required to disable static generation
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const POST_PER_PAGE = 2;

    const [categories, count] = await Promise.all([
      prisma.category.findMany({
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (page - 1),
      }),
      prisma.category.count(),
    ]);

    return NextResponse.json(
      {
        categories,
        totalPages: Math.ceil(count / POST_PER_PAGE),
        currentPage: page,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("Database Error:", err);
    return NextResponse.json(
      {
        message: "Something went wrong!",
        error: process.env.NODE_ENV === "development" ? err.message : null,
      },
      { status: 500 }
    );
  }
};
