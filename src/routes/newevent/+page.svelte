<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	let isSaving = false;

	const handleSubmit: SubmitFunction = () => {
		isSaving = true;
		return async ({ result }) => {
			try {
            const res = await result;
			console.log('Form submission result:', res);
            if (res.type === 'success' || res.type === 'redirect') {
                // Handle both success and redirect cases
                const location = res.type === 'redirect' ? res.location : '/';
                await goto(location);
            }
        } finally {
            isSaving = false;
        }
		};
	};
</script>

<form method="POST" use:enhance={handleSubmit}>
	<label for="title">Title</label>
	<input type="text" id="title" name="title" required />
	<textarea id="description" name="description" rows="4" cols="50" placeholder="Description"
	></textarea>
	<label for="date">Date</label>
	<input type="datetime-local" id="date" name="date" required />
	<button type="submit" disabled={isSaving}>
		{#if isSaving}
			Saving...
		{:else}
			Create Event
		{/if}
	</button>
</form>
