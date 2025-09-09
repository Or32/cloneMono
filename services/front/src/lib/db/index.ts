import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
export * from './schemas'

export const db = drizzle(process.env.DATABASE_URL!);