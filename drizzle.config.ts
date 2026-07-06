import { defineConfig } from 'drizzle-kit';

if (!process.env.POSTGRES_USER) throw new Error('POSTGRES_USER is not set');
if (!process.env.POSTGRES_PASSWORD) throw new Error('POSTGRES_PASSWORD is not set');
if (!process.env.POSTGRES_DB) throw new Error('POSTGRES_DB is not set');
if (!process.env.POSTGRES_HOST) throw new Error('POSTGRES_HOST is not set');

export default defineConfig({
	out: './migrations',
	schema: './src/lib/server/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		host: process.env.POSTGRES_HOST!,
		database: process.env.POSTGRES_DB!,
		user: process.env.POSTGRES_USER!,
		password: process.env.POSTGRES_PASSWORD!,
		port: parseInt(process.env.POSTGRES_PORT || '5432'),
		ssl: false
	},
	verbose: true
});
