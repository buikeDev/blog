import { client } from "../../../sanity/lib/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // GROQ query to fetch all categories from Sanity
    const query = `*[_type == "category"]{_id, title, slug, description}`;
    const categories = await client.fetch(query);
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
