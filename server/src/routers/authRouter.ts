import { Hono } from "hono";
import { login, register } from "../controllers/authController.js";

const authRouter = new Hono();

authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;
