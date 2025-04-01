import { fetchEventById } from '$lib/server/remote-events';
import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
    const { eventId } = params;

    if (!eventId) {
        error(400, 'Missing event ID');
    }

    const id = Number.parseInt(eventId, 10);
    const event = await fetchEventById(id);

    if (event) {
        return json(event);
    }
    error(404, 'Event not found');
};