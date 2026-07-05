// See https://svelte.dev/docs/kit/types#app.d.ts

import type { friends } from "$lib/server/db/schema";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			friend: typeof friends.$inferSelect;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
