export const commentType = {
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "comment", title: "Comment", type: "text" },
    {
      name: "post",
      title: "Post",
      type: "reference",
      to: [{ type: "post" }],
    },
    {
      name: "approved",
      title: "Approved",
      type: "boolean",
      initialValue: true,
    },
  ],
  preview: {
    select: { title: "name", subtitle: "comment" },
  },
};
