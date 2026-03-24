import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  avatar: text().notNull(),
  createdAt: integer({ mode: "timestamp" }).notNull(),
});

export const posts = sqliteTable("posts", {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  link: text().notNull(),
  category: text({ enum: ["wedding", "event", "photo"] }),
  createdAt: integer({ mode: "timestamp" }).notNull(),
});

export const contacts = sqliteTable("contacts", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  contact: text().notNull().unique(),
  subject: text(),
  message: text().notNull(),
  createdAt: integer({ mode: "timestamp" }).notNull(),
});
