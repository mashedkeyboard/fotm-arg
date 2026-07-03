import { drizzle } from 'drizzle-orm/libsql';
import { DB_FILE_NAME } from '$env/static/private';
import { relations } from './relations';

export const getDb = () => drizzle(DB_FILE_NAME, { relations });
