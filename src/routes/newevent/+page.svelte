<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
    import { onMount } from 'svelte';
	import { invalidate } from "$app/navigation";

	let isSaving = false;
	let isEditing = false;
	let title = '';
	let heading = 'New Event';
    let description: string | undefined = '';
    let date = '';
    let eventId: number | null = null;
	let dateError: string | null = null;

	onMount(async () => {
        if (page.url.searchParams.has('update')) {
			isEditing = true;
			heading = "Edit Event";
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
		dateError = null;
		return async ({ result, update }) => {
			try {
				//Validate date
				const selectedDate = new Date(date);
                const now = new Date();

                if (selectedDate < now) {
                    dateError = 'Event date cannot be in the past.';
                    isSaving = false;
                    return; // Cancel form submission
                }

				const res = await result;
				await invalidate("data:events");
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

<form method="POST" use:enhance={handleSubmit} action={eventId ? `/update/${eventId}` : '/newevent'} class="flex justify-center items-center h-screen">
	<div class="w-1/2">
		<h1>{heading}</h1>
		<div class="flex flex-col mb-4">
			<label for="title" class="mb-2">Title</label>
			<input type="text" id="title" name="title" required bind:value={title} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
		</div>

		<div class="mb-4">
			<label for="date" class="mb-2">Date</label>
			<input type="datetime-local" id="date" name="date" required bind:value={date} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
			{#if dateError}
				<p class="text-red-500">{dateError}</p>
			{/if}
		</div>
		<div class="mb-4">
			<textarea id="description" name="description" rows="4" cols="50" placeholder="Description"
				bind:value={description} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
			</textarea>
			<div class="flex gap-4">
				<button type="submit" disabled={isSaving} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
					{#if isSaving}
						Saving...
					{:else if isEditing}
						Save
					{:else}
						Create Event
					{/if}
				</button>
				<a class="btn bg-gray-300 hover:bg-gray-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" href="/" role="button">Back to Home</a>
			</div>
		</div>
	</div>
</form>
