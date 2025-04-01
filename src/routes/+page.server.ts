import { fetchAllEvents } from '$lib/server/remote-events';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({depends}) => {
	// TODO: Add caching
	depends('data:events');
	const loadedEvents = fetchAllEvents();
	return {
		events: loadedEvents
	};
};
