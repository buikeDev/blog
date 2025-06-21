import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: "your_project_id", // Replace with yours
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-06-20", // Or today's date
});
