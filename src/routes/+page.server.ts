import { fetchAllEvents } from '$lib/server/remote-events';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({depends}) => {
	depends('data:events');
	const loadedEvents = fetchAllEvents();
	
	// TODO: the code below causes changes to the events not to be refreshed. Need to rethink caching strategy
	// Set a cache threshold for 15 minutes
    // setHeaders({
    //     'cache-control': 'max-age=900'
    // });

	return {
		events: loadedEvents
	};
};
