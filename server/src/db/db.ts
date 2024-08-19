import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
import { todos, todosRelations, users, usersRelations } from "./schema.js";

dotenv.config();
const client = postgres(process.env.DATABASE_URL, { prepare: false });
export const db = drizzle(client, {
  schema: { todos, users, usersRelations, todosRelations },
});
