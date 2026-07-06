import { getDb } from "$lib/server/db";
import { sql } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { completions } from "$lib/server/db/schema";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
    const completion = await getDb().execute(sql`
        UPDATE ${completions} SET claimed = true WHERE id = ${params.completion} 
        RETURNING *, OLD.claimed AS "alreadyClaimed"
    `);

    if (completion.rowCount != 1) fail(400, 'not a valid completion');

    return {
        completion: completion.rows[0] as typeof completions.$inferSelect & { alreadyClaimed: boolean }
    };
};