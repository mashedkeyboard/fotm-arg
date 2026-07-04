import { getTagsList, isInSession } from '$lib/server/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    const isActive = isInSession(cookies);
    return {
        isActive,
        claimed: isActive ? getTagsList(cookies) : []
    }
};