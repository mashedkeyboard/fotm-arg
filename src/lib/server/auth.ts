import { JWT_SECRET_KEY } from "$env/static/private";
import type { Cookies } from "@sveltejs/kit";
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { createHmac } from 'node:crypto';

const JWT_SECRET = Buffer.from(JWT_SECRET_KEY, 'base64');
const PROGRESS_COOKIE_NAME = 'FOTM-Progress';
const UNAME_COOKIE_NAME = 'FOTM-User';
const FRIENDTOKEN_COOKIE_NAME = 'FOTM-FriendToken';
const STARTWITH_COOKIE_NAME = 'FOTM-StartWith';

const DEFAULT_COOKIE_PROPS = { path: '/', maxAge: 60 * 60 * 24 * 900 };

export type SessionData = { username: string, dect: string, uuid: string, tags: string[] };

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

export const getSessionData = (cookies: Cookies): SessionData | false => {
    const uname = cookies.get(UNAME_COOKIE_NAME);

    if (!(!!uname && !!cookies.get(PROGRESS_COOKIE_NAME))) return false;

    const session = validateSession(cookies);

    if (!session) return false;

    return {
        username: uname.substring(0, uname.indexOf('@')),
        dect: uname.substring(uname.indexOf('@') + 1, uname.indexOf(':')),
        uuid: uname.substring(uname.indexOf(':') + 1),
        tags: session.tagsList
    }
}

export const setUser = (cookies: Cookies, username: string, dect: string) => {
    cookies.set(UNAME_COOKIE_NAME, username + '@' + dect + ':' + crypto.randomUUID(), DEFAULT_COOKIE_PROPS);
    setTagsList(cookies, []);
}

export const setFriendToken = (cookies: Cookies, ip: string, ua: string, friendId: string) => {
    cookies.set(FRIENDTOKEN_COOKIE_NAME, jwt.sign({
        sub: friendId,
        aud: `${ua}@${ip}`
    }, JWT_SECRET), DEFAULT_COOKIE_PROPS);
}

export const getFriendId = (cookies: Cookies, ip: string, ua: string): string | undefined => {
    const cookie = cookies.get(FRIENDTOKEN_COOKIE_NAME);
    if (!cookie) return undefined;
    
    try {
        return (jwt.verify(cookie, JWT_SECRET, { audience: `${ua}@${ip}`}) as JwtPayload).sub;
    } catch {
        return undefined;
    }
}

export const setStartWith = (cookies: Cookies, startWithUuid: string) => {
    cookies.set(STARTWITH_COOKIE_NAME, startWithUuid, { ...DEFAULT_COOKIE_PROPS, maxAge: 60 * 60 * 4 });
}

export const getStartWith = (cookies: Cookies): string | undefined => {
    const val = cookies.get(STARTWITH_COOKIE_NAME);
    if (val) cookies.delete(STARTWITH_COOKIE_NAME, { path: '/' });
    return val;
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