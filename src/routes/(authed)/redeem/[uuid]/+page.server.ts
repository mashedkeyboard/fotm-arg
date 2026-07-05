import { getDb } from '$lib/server/db';
import { getFriendId, setTagsList } from '$lib/server/auth';
import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, cookies, request, getClientAddress, locals }) => {
   const uuid = params.uuid;
   const db = getDb();
   const tag = await db.query.tags.findFirst({ where: { uuid } });
   if (!tag) {
      if (getFriendId(cookies, getClientAddress(), request.headers.get('User-Agent') || '')) {
         return redirect(303, `/friends/register/${uuid}`);
      } else {
         return redirect(307, '/');
      }
   }

   const currentTags = locals.session!.tags;
   setTagsList(cookies, currentTags.concat(tag.id))
};