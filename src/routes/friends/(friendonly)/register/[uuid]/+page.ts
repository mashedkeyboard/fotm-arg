import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ data, url }) => {
    return {
        ...data,
        created: url.searchParams.get('created') === '1'
    };
};