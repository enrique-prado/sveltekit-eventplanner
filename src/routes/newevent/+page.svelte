<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	// Removed EnhanceOptions as it is not exported from '$app/forms'
	let isSaving = false;

	const handleSubmit = (
		form: HTMLFormElement,
		event: SubmitEvent & { result: Promise<{ success: boolean }> }
	) => {
		isSaving = true;
		result.then((res) => {
			isSaving = false;
			if (res.success) form.reset();
		});
	};

	onMount(() => {
		const form = document.querySelector<HTMLFormElement>('form');
		if (form) enhance(form, handleSubmit);
	});
</script>

<form method="POST" action="?/newevent" use:enhance>
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
