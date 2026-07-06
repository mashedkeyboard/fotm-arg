import { getDb } from "$lib/server/db";
import { completions } from "$lib/server/db/schema";
import { getNextTag } from "$lib/server/tags";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const nextTag = await getNextTag(locals.session!.tags);

    let completionId = null;

    if (!nextTag) {
        const db = getDb();

        const completion = await db.insert(completions).values({
                username: locals.session!.username,
                dect: locals.session!.dect,
                path: locals.session?.tags
            })
            .onConflictDoUpdate({ set: { lastLoadedAt: new Date() }, target: [completions.username, completions.dect] })
            .returning({ createdId: completions.id });

        completionId = completion[0].createdId;
    }
    
    return {
        session: locals.session!,
        nextHint: nextTag ? nextTag.hint : null,
        completionId
    };
};