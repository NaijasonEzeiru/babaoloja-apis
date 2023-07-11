import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config();

export default {
	schema: './src/db/schema/*',
	breakpoints: false,
	driver: 'pg',
	out: './drizzle',
	dbCredentials: { connectionString: process.env.DATABASE_URL! }
} satisfies Config;
