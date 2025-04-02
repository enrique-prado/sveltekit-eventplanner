<script lang="ts">
	import type { PageData } from "./$types";

    const {data}: {data: PageData} = $props();
</script>


<div class="w-1/2 flex flex-col h-screen mx-20">
    {#if data.event}
        <h1 class="text-lg font-bold mb-4">Event Details</h1>
        <div class="flex flex-col mb-4">
			<label for="title" class="mb-2">Title</label>
			<input readonly type="text" id="title" name="title" required value={data.event.title} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
		</div>

		<div class="mb-4">
			<label for="date" class="mb-2">Date</label>
			<input readonly type="datetime-local" id="date" name="date" required value={data.event.date} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
		</div>
        <div class="mb-4">
            <textarea readonly id="description" name="description" rows="4" cols="50" placeholder="Description"
				 class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                 {data.event.description}
            </textarea>
        </div>
    {:else}
        <p>No Event with that event Id was found</p>
    {/if}
    <a class="btn bg-gray-300 hover:bg-gray-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" href="/" role="button">Back to Home</a>
</div>