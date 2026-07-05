import { getSessionData, getFriendId, setStartWith } from '$lib/server/auth';
import { getDb } from '$lib/server/db';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const friendId = getFriendId(event.cookies, event.getClientAddress(), event.request.headers.get('User-Agent') || '');

	if (event.route.id?.includes('(authed)')) {
        const session = getSessionData(event.cookies);
		if (session) {
            event.locals.session = session;
        } else {
            if (event.params.uuid) {
                if (friendId) return redirect(307, `/friends/register/${event.params.uuid}`);

                setStartWith(event.cookies, event.params.uuid);
            }
            
            return redirect(307, '/');
        }
	} else if (event.route.id?.includes('(friendonly)')) {
        if (!friendId) redirect(307, '/');

        const db = getDb();
        const friend = await db.query.friends.findFirst({ where: { id: friendId } });
        if (!friend) return redirect(307, '/');

        friend.friendToken = '***';

        event.locals.friend = friend;
	}

	const response = await resolve(event);
	return response;
};