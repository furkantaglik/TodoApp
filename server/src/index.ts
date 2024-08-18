import { serve } from "@hono/node-server";
import app from "./app";

const port = 5000;
console.log(`Server Running At http://localhost:${port}`);
serve({
  fetch: app.fetch,
  port,
});
