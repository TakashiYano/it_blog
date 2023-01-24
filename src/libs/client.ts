import { createClient } from "microcms-js-sdk";

// Initialize Client SDK.
export const client = createClient({
  serviceDomain: "yanot-it-blog",
  apiKey: process.env.API_KEY,
});
