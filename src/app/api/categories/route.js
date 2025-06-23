import { client } from "../../../sanity/lib/client";
import { NextResponse } from "next/server";

// Revalidate every 24 hours since categories don't change often
export const revalidate = 86400;

export const GET = async () => {
  try {
    // GROQ query to fetch all categories from Sanity
    const query = `*[_type == "category"]{_id, title, slug, description}`;
    const categories = await client.fetch(query);
    return new NextResponse(JSON.stringify(categories), {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
