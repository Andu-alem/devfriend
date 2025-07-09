import { InferSelectModel, InferInsertModel, InferEnum } from "drizzle-orm";
import { 
    createSelectSchema,
    createInsertSchema,
    createUpdateSchema
} from "drizzle-zod";

import { jobStatusEnum, jobs } from "./schema/jobs-schema";
import { eventTypeEnum, eventPriorityEnum, events } from "./schema/events-schema";
import { projectStatusEnum, projects } from "./schema/projects-schema";



// generating types from db schema
export type JobStatus = InferEnum<typeof jobStatusEnum>;
export type Job = InferSelectModel<typeof jobs>;
export type NewJob = InferInsertModel<typeof jobs>;


export type EventType = InferEnum<typeof eventTypeEnum>;
export type EventPriority = InferEnum<typeof eventPriorityEnum>;
export type Event = InferSelectModel<typeof events>;
export type NewEvent = InferInsertModel<typeof events>;


export type ProjectStatus = InferEnum<typeof projectStatusEnum>;
export type Project = InferSelectModel<typeof projects>;
export type NewProject = InferInsertModel<typeof projects>;


// zod schemas
export const projectSchema = createInsertSchema(projects);
export const projectSelectSchema = createSelectSchema(projects);
export const projectUpdateSchema = createUpdateSchema(projects);
export const eventInsertSchema = createInsertSchema(events);
export const eventSelectSchema = createSelectSchema(events);
export const eventUpdateSchema = createUpdateSchema(events);
export const jobSelectSchema = createSelectSchema(jobs);
export const jobInsertSchema = createInsertSchema(jobs);
export const jobUpdateSchema = createUpdateSchema(jobs);

