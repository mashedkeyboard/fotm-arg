import { drizzle } from 'drizzle-orm/node-postgres';
import { relations } from './relations';
import { env } from '$env/dynamic/private';

export const getDb = () => drizzle(`postgresql://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT || 5432}/${env.POSTGRES_DB}`, { relations });
