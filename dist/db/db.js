import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { config } from 'dotenv';
import * as schema from './schema/schema.js';
config();
// for migrations
const sql = postgres(process.env.DATABASE_URL, {
    max: 1
});
const db = drizzle(sql, { schema });
await migrate(db, { migrationsFolder: 'drizzle' });
// process.exit();
// for query purposes
// const queryClient = postgres("postgres://postgres:adminadmin@0.0.0.0:5432/db");
// const db: PostgresJsDatabase = drizzle(queryClient);
// await db.select().from(...)...
export { db };
//# sourceMappingURL=db.js.map