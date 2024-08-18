import { Context, Next } from "hono";
import jwt from "jsonwebtoken";
import response from "../utils/response";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const checkToken = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response(c, "Yetkisiz erişim", null, 401);
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    c.set("user", decoded);
    await next();
  } catch (error) {
    console.log(error.message);
    return response(
      c,
      "Yetkilendirme başarısız. Geçersiz token",
      null,
      401,
      false
    );
  }
};

export default checkToken;
