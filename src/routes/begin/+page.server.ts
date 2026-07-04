import { getStartWith, setUser } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ cookies, request }) => {
      const data = await request.formData();
      const username = data.get('username');
      if (!username) {
			return fail(400, { username, errors: { username: { missing: true } } });
      }

      const emfphone = data.get('emfphone');
      if (!emfphone) {
			return fail(400, { emfphone, errors: { emfphone: { missing: true } } });
      }

      setUser(cookies, username.toString(), emfphone.toString());

		const startWith = getStartWith(cookies);

      if (startWith) {
         return redirect(303, `/redeem/${startWith}`);
      }

      return redirect(303, '/help')
	}
} satisfies Actions;