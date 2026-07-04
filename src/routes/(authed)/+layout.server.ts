import { isInSession, setStartWith } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export function load({ cookies, params }) {
	if (!isInSession(cookies)) {
        if (params.uuid) setStartWith(cookies, params.uuid);
		return redirect(307, '/');
	}
}