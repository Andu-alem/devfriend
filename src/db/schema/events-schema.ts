import { pgTable, pgEnum, serial, varchar, text, date, time, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";


export const eventTypeEnum = pgEnum('type', [
    "meeting",
    "interview",
    "deadline",
    "follow-up",
    "task",
    "other"
]);

export const eventPriorityEnum = pgEnum('priority', [
    "high",
    "medium",
    "low"
]);

export const events = pgTable("events", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    date: date("date").notNull(),
    time: time("time").notNull(),
    type: eventTypeEnum("type").notNull(),
    priority: eventPriorityEnum("priority").default("medium").notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
});