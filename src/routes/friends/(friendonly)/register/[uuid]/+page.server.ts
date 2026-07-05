import { getDb } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import { tags } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const actions = {
    default: async ({ request, params, locals }) => {
        const data = await request.formData();

        const title = data.get('title')?.toString();
        const hint = data.get('hint')?.toString();

        if (!title || !hint) {
            return fail(400, { title, hint, error: true });
        }

        const newTag: typeof tags.$inferInsert = { uuid: params.uuid, title, hint, authorId: locals.friend.id };
        const db = getDb();
        await db.insert(tags).values(newTag)

        redirect(303, request.url + '?created=1');
    }
} satisfies Actions;

export const load: PageServerLoad = async ({ params }) => {
    const uuid = params.uuid;
    const db = getDb();
    const tag = await db.query.tags.findFirst({ where: { uuid } });

    return {
        tag
    };
};