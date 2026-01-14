import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: "nnqezp9l",
  dataset: "production",
  apiVersion: "2026-01-14",
  useCdn: true,
});
