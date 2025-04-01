import { createEvent } from '$lib/server/remote-events';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const formdata = await request.formData();
		const title = formdata.get('title')?.toString();
		const description = formdata.get('description')?.toString();
		const date = formdata.get('date')?.toString();

		if (!title || !date) {
			return fail(400, { error: 'Title and Date are required' });
		}

		//Server side validation for date
		const newDate = new Date(date);
        const now = new Date();

        if (newDate < now) {
            return fail(400, { error: 'Event date cannot be in the past.' });
        }

		//TODO: Redirect update event here with custom action?
		await createEvent({ title, description, date });
		throw redirect(303, "/");
		// const newEvent = await createEvent({ title, description, date });
		// throw redirect(303, `/${newEvent.id}`);
	}
};
