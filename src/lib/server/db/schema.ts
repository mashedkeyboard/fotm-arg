import { sql } from 'drizzle-orm';
import { boolean, json, numeric, pgSequence, pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

export const tagOrder = pgSequence("tag_order_seq");

export const tags = pgTable('tags', {
	id: uuid().primaryKey().defaultRandom(),
	title: text().notNull(),
	uuid: text().notNull(),
	hint: text(),
	authorId: uuid().references(() => friends.id),
	order: numeric().notNull().unique().default(sql`nextval('tag_order_seq')`)
}, (table) => [
  uniqueIndex("tags_id_idx").on(table.id),
]);

export const friends = pgTable('friends', {
	id: uuid().primaryKey().defaultRandom(),
	friendToken: text().unique(),
	name: text().notNull(),
	dect: numeric()
}, (table) => [
  uniqueIndex("friends_id_idx").on(table.id),
  uniqueIndex("friends_friendToken_idx").on(table.friendToken),
]);

export const completions = pgTable('completions', {
	id: uuid().primaryKey().defaultRandom(),
	username: text().notNull(),
	dect: text().notNull(),
	completedAt: timestamp().defaultNow().notNull(),
	lastLoadedAt: timestamp().defaultNow().notNull(),
	path: json(),
	claimed: boolean().default(false).notNull()
}, (table) => [
  uniqueIndex("completions_username_dect_idx").on(table.username, table.dect),
]);