import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import todoRouter from "./routers/todoRouter.js";
import { HTTPException } from "hono/http-exception";
import response from "./utils/response.js";
import authRouter from "./routers/authRouter.js";
import checkToken from "./middlewares/authMiddleware.js";

const app = new Hono().basePath("/api");
app.use(cors());
app.use(prettyJSON());
app.notFound((c) => {
  return response(c, "API noktası bulunamadı", null, 404, false);
});

app.get("/", (c) => {
  return c.json({ message: "Congrats! You've deployed Hono to Vercel" });
});

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return response(
    c,
    err.message || "Beklenmedik bir hata oluştu",
    null,
    500,
    false
  );
});

app.route("/auth", authRouter);

app.use(checkToken);
app.route("/todos", todoRouter);

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
