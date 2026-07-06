import { inArray, sql } from "drizzle-orm";
import { getDb } from "./db"
import { tags } from "./db/schema"

export const getNextTag = async (acquiredTags: string[]): Promise<typeof tags.$inferSelect | undefined> => {
    const db = getDb();

    const highestAcquiredTag = db.select({ order: tags.order }).from(tags).where(inArray(tags.id, acquiredTags)).orderBy(tags.order).limit(1);
    return await db.query.tags.findFirst({
        where: {
            id: {
                notIn: acquiredTags
            }
        },
        orderBy: (t) => sql`(${highestAcquiredTag} > ${t.order}) DESC, ${t.order} ASC`,
    });
}