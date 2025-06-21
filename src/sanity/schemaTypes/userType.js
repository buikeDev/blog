export default {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "emailVerified",
      title: "Email Verified",
      type: "datetime",
    },
    {
      name: "image",
      title: "Image",
      type: "url",
    },
  ],
};
