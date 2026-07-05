import { getSessionData } from '$lib/server/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    const session = getSessionData(cookies);
    return {
        isActive: !!session,
        claimed: session ? session.tags : []
    }
};