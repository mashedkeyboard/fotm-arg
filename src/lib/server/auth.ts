import { JWT_SECRET_KEY } from "$env/static/private";
import type { Cookies } from "@sveltejs/kit";
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { createHmac } from 'node:crypto';

const JWT_SECRET = Buffer.from(JWT_SECRET_KEY, 'base64');
const PROGRESS_COOKIE_NAME = 'FOTM-Progress';
const UNAME_COOKIE_NAME = 'FOTM-User';
const STARTWITH_COOKIE_NAME = 'FOTM-StartWith';

const DEFAULT_COOKIE_PROPS = { path: '/', maxAge: 60 * 60 * 24 * 900 };

const getUidHash = (uid: string) => {
    return createHmac('sha256', JWT_SECRET).update(uid).digest('base64');
}

export const isInSession = (cookies: Cookies): boolean => {
    return !!cookies.get(UNAME_COOKIE_NAME);
}

export const setUser = (cookies: Cookies, username: string) => {
    cookies.set(UNAME_COOKIE_NAME, username + crypto.randomUUID(), DEFAULT_COOKIE_PROPS);
}


export const setStartWith = (cookies: Cookies, startWithUuid: string) => {
    cookies.set(STARTWITH_COOKIE_NAME, startWithUuid, { ...DEFAULT_COOKIE_PROPS, maxAge: 60 * 60 * 4 });
}

export const getStartWith = (cookies: Cookies): string | undefined => {
    const val = cookies.get(STARTWITH_COOKIE_NAME);
    if (val) cookies.delete(STARTWITH_COOKIE_NAME, { path: '/' });
    return val;
}

export const getTagsList = (cookies: Cookies): string[] => {
    const uid = cookies.get(UNAME_COOKIE_NAME);
    if (!uid) return [];

    const token = jwt.verify(cookies.get(PROGRESS_COOKIE_NAME) || '', JWT_SECRET, { subject: getUidHash(uid) }) as JwtPayload;
    return token?.tagsList;
}

export const setTagsList = (cookies: Cookies, tagsList: string[]) => {
    const uid = cookies.get(UNAME_COOKIE_NAME);
    if (!uid) {
        throw new Error('no user set');
    }

    const thisJwt = jwt.sign({
         sub: uid,
         tagsList
    }, JWT_SECRET);

    cookies.set(PROGRESS_COOKIE_NAME, thisJwt, DEFAULT_COOKIE_PROPS);

    return tagsList;
}