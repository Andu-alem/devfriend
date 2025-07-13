import dotenv from 'dotenv';
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
//import { drizzle } from 'drizzle-orm/node-postgres';

dotenv.config({ path: './.env.local' })

//export const db = drizzle(process.env.DATABASE_URL || "");
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });