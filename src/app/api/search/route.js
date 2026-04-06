import { createClient } from "next-sanity";
import { NextResponse } from "next/server";
import { apiVersion, dataset, projectId } from "../../../sanity/env";

// No CDN — search results must be fresh
const searchClient = createClient({ projectId, dataset, apiVersion, useCdn: false });

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const q = `${query}*`; // trailing wildcard for prefix matching

    const groqQuery = `*[_type == "post" && (
      title match $q ||
      pt::text(body) match $q
    )] | order(_createdAt desc) [0...8] {
      _id,
      title,
      slug,
      _createdAt,
      "excerpt": pt::text(body)[0..120],
      mainImage { asset->{ url }, alt },
      categories[]->{ title, slug }
    }`;

    const results = await searchClient.fetch(groqQuery, { q });
    return NextResponse.json(results);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
};
