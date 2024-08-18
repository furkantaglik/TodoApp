import { Hono } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import todoRouter from "./routers/todoRouter";
import { HTTPException } from "hono/http-exception";
import response from "./utils/response";
import authRouter from "./routers/authRouter";
import checkToken from "./middlewares/authMiddleware";

const app = new Hono().basePath("/api");
app.use(cors());
app.use(prettyJSON());
app.notFound((c) => {
  return response(c, "API noktası bulunamadı", null, 404, false);
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

export default app;
