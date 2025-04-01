import { fetchEventById } from "$lib/server/remote-events";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params}) => {
    const eventId = Number.parseInt(params.eventId);
    const event = await fetchEventById(eventId);
    return {
        event
    }
}