import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

// for migrations
const sql = postgres('postgres://postgres:adminadmin@0.0.0.0:5432/db', {
	max: 1
});
const db = drizzle(sql);
await migrate(db, { migrationsFolder: 'drizzle' });

// for query purposes
// const queryClient = postgres("postgres://postgres:adminadmin@0.0.0.0:5432/db");
// const db: PostgresJsDatabase = drizzle(queryClient);
// await db.select().from(...)...
