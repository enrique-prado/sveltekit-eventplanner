<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
    import { onMount } from 'svelte';

	let isSaving = false;
	let isEditing = false;
	let title = '';
    let description: string | undefined = '';
    let date = '';
    let eventId: number | null = null;

	onMount(async () => {
        if (page.url.searchParams.has('update')) {
			isEditing = true;
            eventId = Number.parseInt(page.url.searchParams.get('update') || '', 10);
			console.log("eventId to fetch: ", eventId);
			const response = await fetch(`/get/${eventId}`);
            if (response.ok) {
                const event = await response.json();
				console.log('event: ', event);
                title = event.title;
                description = event.description;
                date = event.date;
            } else {
                console.error('Failed to fetch event for editing');
            }
        }
    });

	const handleSubmit: SubmitFunction = () => {
		isSaving = true;
		return async ({ result, update }) => {
			try {
				const res = await result;
				// await update();  TODO: Is this needed? works without it but it may cause timing issues.
				console.log("res = ", res);
				if (res.type === 'redirect') {
                    await goto(res.location);
                }
			} catch (err) {
				console.error(err);
			} finally {
				isSaving = false;
			}
		};
	};
</script>

<form method="POST" use:enhance={handleSubmit} action={eventId ? `/update/${eventId}` : '/newevent'}>
	<label for="title">Title</label>
	<input type="text" id="title" name="title" required bind:value={title} />
	<textarea id="description" name="description" rows="4" cols="50" placeholder="Description"
		bind:value={description}>
	</textarea>
	<label for="date">Date</label>
	<input type="datetime-local" id="date" name="date" required bind:value={date} />
	<button type="submit" disabled={isSaving}>
		{#if isSaving}
			Saving...
		{:else if isEditing}
			Save
		{:else}
			Create Event
		{/if}
	</button>
</form>
