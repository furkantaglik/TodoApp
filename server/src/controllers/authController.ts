import { Context } from "hono";
import { db } from "../db/db";
import { users } from "../db/schema";
import { eq, or } from "drizzle-orm";
import response from "../utils/response";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SALT_ROUNDS = parseInt(process.env.PASS_SALT_ROUNDS, 10);
const JWT_SECRET = process.env.JWT_SECRET_KEY;

export const generateEncryptedPassword = async (password: string) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const generateDecryptedPassword = async (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateJwt = (user: object) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyUser = async (username: string, email: string) => {
  const existingUser = await db.query.users.findFirst({
    where: or(eq(users.email, email), eq(users.username, username)),
  });
  return existingUser ? true : false;
};

export const register = async (c: Context) => {
  try {
    const { email, username, password } = await c.req.json();
    const userExists = await verifyUser(username, email);
    if (userExists) {
      return response(c, "Kullanıcı zaten mevcut", null, 400, false);
    }
    const hashedPassword = await generateEncryptedPassword(password);
    const addedUser = await db
      .insert(users)
      .values({ email, username, password: hashedPassword })
      .returning();

    const token = generateJwt({
      id: addedUser[0].id,
      email: addedUser[0].email,
      username: addedUser[0].username,
    });
    return response(c, "Kayıt başarılı", token);
  } catch (error) {
    console.log(error.message);
    throw new Error();
  }
};

export const login = async (c: Context) => {
  try {
    const { emailOrUsername, password } = await c.req.json();
    const user = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.email, emailOrUsername),
          eq(users.username, emailOrUsername)
        )
      )
      .limit(1);

    if (user.length === 0) {
      return response(c, "Kullanıcı bulunamadı", null, 404, false);
    }

    const foundUser = user[0];
    const isPasswordValid = await generateDecryptedPassword(
      password,
      foundUser.password
    );

    if (!isPasswordValid) {
      return response(c, "Şifre Geçersiz", null, 401, false);
    }
    const token = generateJwt({
      id: foundUser.id,
      email: foundUser.email,
      username: foundUser.username,
    });
    return response(c, "Giriş başarılı", token);
  } catch (error) {
    console.log(error.message);
    throw new Error();
  }
};
