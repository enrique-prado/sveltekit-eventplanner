<script lang="ts">
	import type { PageData } from './$types';
	import { invalidate } from '$app/navigation';

	let { data }: { data: PageData } = $props();

	async function deleteEvent(id: number) {
        await fetch(`/delete/${id}`, { method: 'POST' });
		await invalidate('data:events'); // Refresh data.events after deletion
    }
</script>

<h1 class="text-xl text-center mb-4">Enrique's Event Planner</h1>
<div class="flex flex-col">
	<div class="flex justify-center gap-4">
		<a class="btn" href="/newevent" role="button">Add Event</a>
		<input placeholder="Search title" type="text" id="search" name="search" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
	</div>
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
						<td class="border border-x-0 px-4 py-2">{event.title}</td>
						<td class="border border-x-0 px-4 py-2">{event.description}</td>
						<td class="border border-x-0 px-4 py-2">{event.date}</td>
						<td class="border px-4 py-2">
							<div class="group relative">
								<span class="invisible group-hover:visible">
									<button aria-label="delete" class="px-2 hover:bg-gray-200" onclick={() => deleteEvent(event.id)}>
										<i class="fa fa-trash"></i>
									</button>
									<a href="/newevent?update={event.id}" aria-label="edit" class="px-2 hover:bg-gray-200">
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
</div>
