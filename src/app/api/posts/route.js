import { client } from "../../../sanity/lib/client";
import { NextResponse } from "next/server";

// Revalidate every hour for posts
export const revalidate = 3600;

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const POST_PER_PAGE = 2;
    const start = POST_PER_PAGE * (page - 1);
    const end = start + POST_PER_PAGE;
    const cat = searchParams.get("cat");
    // GROQ query to fetch paginated posts
    const postsQuery = `*[_type == "post" ${cat ? `&& "${cat}" in categories[]->slug.current` : ""}] | order(_createdAt desc) [${start}...${end}] {
      _id,
      title,
      slug,
      body,
      _createdAt,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      categories[]->{
        title
      }
    }`;

    const countQuery = `count(*[_type == "post" ${cat ? `&& "${cat}" in categories[]->slug.current` : ""}])`;

    const [posts, count] = await Promise.all([
      client.fetch(postsQuery),
      client.fetch(countQuery),
    ]);

    return NextResponse.json(
      {
        posts,
        totalPages: Math.ceil(count / POST_PER_PAGE),
        currentPage: page,
        count,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600",
        },
      }
    );
  } catch (err) {
    console.error("Sanity Error:", err);
    return NextResponse.json(
      {
        message: "Something went wrong!",
        error: process.env.NODE_ENV === "development" ? err.message : null,
      },
      { status: 500 }
    );
  }
};
