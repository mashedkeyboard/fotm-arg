import { setFriendToken } from '$lib/server/auth';
import { getDb } from '$lib/server/db';
import { friends } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, cookies, getClientAddress, request }) => {
   const token = params.token;
   if (!token) return redirect(307, '/');

   const db = getDb();
   const friend = await db.query.friends.findFirst({ where: { friendToken: token } });
   if (!friend) return redirect(307, '/');

   const ip = getClientAddress();
   const ua = request.headers.get('User-Agent');

   setFriendToken(cookies, ip, ua || '', friend.id);

   await db.update(friends).set({ friendToken: null }).where(eq(friends.id, friend.id));

   return redirect(303, '/friends')
};