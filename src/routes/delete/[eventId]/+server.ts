// import type { RequestHandler } from './$types';
import { deleteEventById } from '$lib/server/remote-events';
import { error, json } from '@sveltejs/kit';
import type { RouteParams } from './$types';

// TODO: Add confirmation dialog
export async function POST({ params }: { params: RouteParams }) {
    const { eventId } = params;

    if (!eventId) {
        throw error(400, 'Missing event ID');
    }

    try {
        const id = Number.parseInt(eventId, 10);
        const deleted = await deleteEventById(id);

        if (deleted) {
            return json({ success: true });
            // TODO: Add notification toast
        }
    } catch (err) {
        console.error('Error deleting event:', err);
        throw error(500, 'Failed to delete event');
    }
}