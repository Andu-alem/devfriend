import { relations } from "drizzle-orm";
import { user } from "./auth-schema";
import { jobs } from "./jobs-schema";
import { projects } from './projects-schema';

export const userRelations = relations(user, ({ many }) => ({
    projects: many(projects),
    jobs: many(jobs)
}));

export const projectsRelations = relations(projects, ({ one }) => ({
    user: one(user, {
        fields: [projects.userId],
        references: [user.id]
    })
}));

export const jobsRelations = relations(jobs, ({ one }) => ({
    user: one(user, {
        fields: [jobs.userId],
        references: [user.id]
    })
}));