import { Message } from "ai";
import { InferSelectModel } from "drizzle-orm";
import { pgTable, varchar, timestamp, json, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("User", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  email: varchar("email", { length: 64 }).notNull(),
  password: varchar("password", { length: 64 }),
  companyId: uuid("companyId").references(() => company.id),
});

export type User = InferSelectModel<typeof user>;

export const chat = pgTable("Chat", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  createdAt: timestamp("createdAt").notNull(),
  messages: json("messages").notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
});

export type Chat = Omit<InferSelectModel<typeof chat>, "messages"> & {
  messages: Array<Message>;
};

export const company = pgTable("Company", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: varchar("name", { length: 64 }).notNull(),
  logoUrl: varchar("logoUrl", { length: 256 }),
});

export type Company = InferSelectModel<typeof company>;
