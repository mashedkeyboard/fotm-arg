import { getDb } from '$lib/server/db';
import { getTagsList, setTagsList } from '$lib/server/auth';
import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, cookies }) => {
   const uuid = params.uuid;
   const db = getDb();
   const tag = await db.query.tags.findFirst({ where: { uuid } });
   if (!tag) return redirect(307, '/');

   const currentTags = getTagsList(cookies);
   setTagsList(cookies, currentTags.concat(tag.id))
};