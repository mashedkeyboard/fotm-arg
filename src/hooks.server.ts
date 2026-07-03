import { isInSession, setStartWith } from '$lib/server/auth';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/redeem') && !isInSession(event.cookies)) {
        if (event.params.uuid) setStartWith(event.cookies, event.params.uuid);
		return redirect(307, '/');
	}

	const response = await resolve(event);
	return response;
};