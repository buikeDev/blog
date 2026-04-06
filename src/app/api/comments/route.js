import { createClient } from "next-sanity";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../utils/auth";
import { apiVersion, dataset, projectId } from "../../../sanity/env";

// Bypass CDN so comments appear immediately after posting
const readClient = createClient({ projectId, dataset, apiVersion, useCdn: false });

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ message: "postId is required" }, { status: 400 });
  }

  try {
    const query = `*[_type == "comment" && post._ref == $postId && approved == true] | order(_createdAt asc) {
      _id, name, comment, _createdAt
    }`;
    const comments = await readClient.fetch(query, { postId });
    return NextResponse.json(comments);
  } catch {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};

export const POST = async (req) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { postId, comment } = await req.json();

    if (!postId || !comment?.trim()) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const writeClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    });

    const doc = await writeClient.create({
      _type: "comment",
      name: session.user.name,
      email: session.user.email,
      comment: comment.trim(),
      post: { _type: "reference", _ref: postId },
      approved: true,
    });

    return NextResponse.json(doc, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};
