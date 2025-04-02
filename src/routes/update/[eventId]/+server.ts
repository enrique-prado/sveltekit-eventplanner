import { updateEventById } from '$lib/server/remote-events';
import { error, json } from '@sveltejs/kit';
import type { RouteParams } from './$types';

export async function POST({ params, request }: { params: RouteParams, request: Request }) {
    const { eventId } = params;
    const formData = await request.formData();
    const title = formData.get('title')?.toString();
    const description = formData.get('description')?.toString();
    const date = formData.get('date')?.toString();

    if (!eventId) {
        throw error(400, 'Missing event ID');
    }

    try {
        const id = Number.parseInt(eventId, 10);
        const updatedEvent = await updateEventById(id, { title, description, date });

        if (updatedEvent) {
            return json({ success: true, event: updatedEvent });
            // TODO: Add toast notification
        }
    } catch (err) {
        console.error('Error updating event:', err);
        throw error(500, 'Failed to update event');
    }
}