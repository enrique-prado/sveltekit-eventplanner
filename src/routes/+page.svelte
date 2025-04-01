<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1 class="text-xl text-center">Event Planner</h1>
<a class="btn" href="/newevent" role="button">Add Event</a>
<div class="flex justify-center">
	{#await data.events}
		<p>Loading events...</p>
	{:then events}
		<table class="table-auto">
			<thead>
				<tr>
					<th class="px-4 py-2">ID</th>
					<th class="px-4 py-2">Title</th>
					<th class="px-4 py-2">Description</th>
					<th class="px-4 py-2">Date</th>
				</tr>
			</thead>
			<tbody>
				{#each events as event}
					<tr>
						<td class="border px-4 py-2">{event.id}</td>
						<td class="border px-4 py-2">{event.title}</td>
						<td class="border px-4 py-2">{event.description}</td>
						<td class="border px-4 py-2">{event.date}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:catch error}
		<p>Error loading events: {error.message}</p>
	{/await}
	
</div>
