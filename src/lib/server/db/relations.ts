import { defineRelations } from "drizzle-orm";
import * as schema from './schema';

export const relations = defineRelations(schema, (r) => ({
    tags: {
        author: r.one.friends({
            from: r.tags.authorId,
            to: r.friends.id
        })
    }
}));