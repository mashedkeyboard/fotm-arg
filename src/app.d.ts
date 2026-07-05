// See https://svelte.dev/docs/kit/types#app.d.ts

import type { SessionData } from "$lib/server/auth";
import type { friends } from "$lib/server/db/schema";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			friend?: typeof friends.$inferSelect;
			session?: SessionData;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
