<script lang="ts">
	import type { PageData } from './$types';
	import { invalidate } from '$app/navigation';

	let { data }: { data: PageData } = $props();

	async function deleteEvent(id: number) {
        await fetch(`/delete/${id}`, { method: 'POST' });
		await invalidate('data:events'); // Refresh data.events after deletion
    }
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
					<th class="px-4 py-2">Action</th>
				</tr>
			</thead>
			<tbody>
				{#each events as event}
					<tr>
						<td class="border px-4 py-2">{event.id}</td>
						<td class="border px-4 py-2">{event.title}</td>
						<td class="border px-4 py-2">{event.description}</td>
						<td class="border px-4 py-2">{event.date}</td>
						<td class="border px-4 py-2">
							<div class="group relative">
								<span class="invisible group-hover:visible">
									<button aria-label="delete" class="hover:bg-gray-200" onclick={() => deleteEvent(event.id)}>
										<i class="fa fa-trash"></i>
									</button>
									<a href="/newevent?update={event.id}" aria-label="edit" class="hover:bg-gray-200">
										<i class="fa fa-edit"></i>
									</a>
								</span>
							</div>
                        </td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:catch error}
		<p>Error loading events: {error.message}</p>
	{/await}
	
</div>
