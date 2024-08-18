import { and, desc, eq, ilike, or } from "drizzle-orm";
import { db } from "../db/db";
import { todos, users } from "../db/schema";
import { Context } from "hono";
import response from "../utils/response";

export const create = async (c: Context) => {
  try {
    const { content } = await c.req.json();
    const authorId = c.get("user").id;

    const data = await db
      .insert(todos)
      .values({ content, authorId })
      .returning();
    return response(c, "Todo eklendi", data);
  } catch (error) {
    console.log(error.message);
    throw new Error();
  }
};

export const update = async (c: Context) => {
  try {
    const { content, id, completed } = await c.req.json();
    const authorId = c.get("user").id;

    const data = await db
      .update(todos)
      .set({ content, completed })
      .where(and(eq(todos.id, id), eq(todos.authorId, authorId)))
      .returning();

    if (data.length === 0) {
      return response(c, "Todo bulunamadı", null, 404, false);
    }
    return response(c, "Todo güncellendi", data);
  } catch (error) {
    console.log(error.message);
    throw new Error();
  }
};

export const remove = async (c: Context) => {
  try {
    const id = await parseInt(c.req.param("id"));
    const authorId = c.get("user").id;
    const data = await db
      .delete(todos)
      .where(and(eq(todos.id, id), eq(todos.authorId, authorId)))
      .returning();
    if (data.length === 0) {
      return response(c, "Todo bulunamadı", null, 404, false);
    }
    return response(c, "Todo silindi", data);
  } catch (error) {
    console.log(error.message);
    throw new Error();
  }
};

export const getById = async (c: Context) => {
  try {
    const id = await parseInt(c.req.param("id"));
    const data = await db.select().from(todos).where(eq(todos.id, id));
    if (data.length === 0) {
      return response(c, "Todo bulunamadı", null, 404, false);
    }
    return response(c, null, data);
  } catch (error) {
    console.log(error.message);
    throw new Error();
  }
};

export const getByUserId = async (c: Context) => {
  try {
    const authorId = c.get("user").id;
    const data = await db
      .select()
      .from(todos)
      .where(eq(todos.authorId, authorId))
      .orderBy(desc(todos.createdAt));
    if (data.length === 0) {
      return response(c, "Todo bulunamadı", null, 404, false);
    }
    return response(c, null, data);
  } catch (error) {
    console.log(error.message);
    throw new Error();
  }
};

export const getAll = async (c: Context) => {
  try {
    const data = await db.select().from(todos).orderBy(desc(todos.createdAt));
    return response(c, null, data);
  } catch (error) {
    console.log(error.message);
    throw new Error();
  }
};

export const search = async (c: Context) => {
  try {
    const query = c.req.query("q");
    const data = await db
      .select()
      .from(todos)
      .where(ilike(todos.content, `%${query}%`))
      .orderBy(desc(todos.createdAt));
    if (data.length === 0) {
      return response(c, "Todo bulunamadı", null, 404, false);
    }
    return response(c, null, data);
  } catch (error) {
    console.log(error.message);
    throw new Error();
  }
};

export const getAllDetails = async (c: Context) => {
  try {
    const data = await db.query.users.findMany({
      with: { todos: true },
      orderBy: (todos, { desc }) => [desc(todos.createdAt)],
    });

    return response(c, null, data);
  } catch (error) {
    console.log(error.message);
    throw new Error();
  }
};
