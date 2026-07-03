import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const tags = sqliteTable('tags', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	uuid: text('uuid').notNull()
});
