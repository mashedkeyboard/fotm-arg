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

const validateSession = (cookies: Cookies): JwtPayload | false => {
    const uid = cookies.get(UNAME_COOKIE_NAME);
    try {
        return jwt.verify(cookies.get(PROGRESS_COOKIE_NAME) || '', JWT_SECRET, { subject: getUidHash(uid || '') }) as JwtPayload;
    } catch {
        return false;
    }
}

export const isInSession = (cookies: Cookies): boolean => {    
    return !!cookies.get(UNAME_COOKIE_NAME) && !!cookies.get(PROGRESS_COOKIE_NAME) && !!validateSession(cookies);
}

export const setUser = (cookies: Cookies, username: string, dect: string) => {
    cookies.set(UNAME_COOKIE_NAME, username + '@' + dect + ':' + crypto.randomUUID(), DEFAULT_COOKIE_PROPS);
    setTagsList(cookies, []);
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

    const token = validateSession(cookies);
    if (!token) return [];

    return token?.tagsList;
}

export const setTagsList = (cookies: Cookies, tagsList: string[]) => {
    const uid = cookies.get(UNAME_COOKIE_NAME);
    if (!uid) {
        throw new Error('no user set');
    }

    const thisJwt = jwt.sign({
         sub: getUidHash(uid),
         tagsList
    }, JWT_SECRET);

    cookies.set(PROGRESS_COOKIE_NAME, thisJwt, DEFAULT_COOKIE_PROPS);

    return tagsList;
}