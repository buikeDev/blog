import { createClient } from "next-sanity";
import { NextResponse } from "next/server";
import { apiVersion, dataset, projectId } from "../../../../sanity/env";

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export const POST = async (req) => {
  try {
    const { postId } = await req.json();
    if (!postId) {
      return NextResponse.json({ message: "postId required" }, { status: 400 });
    }
    await writeClient
      .patch(postId)
      .setIfMissing({ viewCount: 0 })
      .inc({ viewCount: 1 })
      .commit();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};
