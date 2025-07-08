import { pgTable, pgEnum, serial, text, varchar, date, timestamp, jsonb } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const projectStatusEnum = pgEnum('status', [
    "idea",
    "inprogress",
    "completed",
    "deployed"
]);

export const projects = pgTable("projects", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    status: projectStatusEnum("status").default("idea").notNull(),
    techStack: jsonb("tech_stack").$type<string[]>().notNull(),
    githubUrl: varchar("github_url", { length: 255 }),
    demoUrl: varchar("demo_url", { length: 255 }),
    startDate: date("start_date"),
    deadline: date("deadline"),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
});