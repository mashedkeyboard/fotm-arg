import { numeric, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const tags = sqliteTable('tags', {
	id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
	title: text().notNull(),
	uuid: text().notNull(),
	hint: text(),
	authorId: text().references(() => friends.id)
}, (table) => [
  uniqueIndex("tags_id_idx").on(table.id),
]);

export const friends = sqliteTable('friends', {
	id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
	friendToken: text().unique(),
	name: text().notNull(),
	dect: numeric()
}, (table) => [
  uniqueIndex("friends_id_idx").on(table.id),
  uniqueIndex("friends_friendToken_idx").on(table.friendToken),
]);