import { pgTable, pgEnum, serial, text, varchar, date, timestamp, jsonb } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const jobStatusEnum = pgEnum("job_status", [
    "saved",
    "applied",
    "interviewing",
    "offer",
    "rejected",
    "accepted",
  ]);

export const jobs = pgTable("jobs", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    company: varchar("company", { length: 255 }).notNull(),
    location: varchar("location", { length: 255 }),
    salary: varchar("salary", { length: 100 }),
    status: jobStatusEnum("job_status").default("saved").notNull(),
    description: text("description").notNull(),
    url: varchar("url", { length: 255 }),
    requiredSkills: jsonb("required_skills").$type<string[]>(),
    deadline: date('deadline'),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
});