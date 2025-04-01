<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	let isSaving = false;

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
