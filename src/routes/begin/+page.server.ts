import { getStartWith, setUser } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

const BANNED_CHARS = /[@:;,]/;

export const actions = {
	default: async ({ cookies, request }) => {
      const data = await request.formData();

      const username = data.get('username');
      const emfphone = data.get('emfphone');

      if (!username || !emfphone || username.toString().match(BANNED_CHARS) || !emfphone.toString().match(/^\d+$/)) {
			  return fail(400, { username, emfphone, error: true });
      }

      setUser(cookies, username.toString(), emfphone.toString());

		const startWith = getStartWith(cookies);

      if (startWith) {
         return redirect(303, `/redeem/${startWith}`);
      }

      return redirect(303, '/help')
	}
} satisfies Actions;