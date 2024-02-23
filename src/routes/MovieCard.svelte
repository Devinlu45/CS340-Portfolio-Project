<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Movie, Platform } from '$lib/database';
	import Modal from './Modal.svelte';

	export let movie: Movie;
	export let platformIDs: number[];
	let randomImage = `https://source.unsplash.com/300x300/?${movie.Name}`;

	const platforms = fetch('/api/platforms').then((res) => res.json()) as Promise<Platform[]>;

	let showEdit = false;
	let showDelete = false;
</script>

<div class="flex w-64 flex-col justify-between rounded-sm bg-white p-5 shadow-md">
	<div>
		<img src={randomImage} alt={movie.Name} class="h-32 w-full rounded-lg object-cover" />
		<h2 class="mt-5 text-xl font-bold">{movie.Name}</h2>
	</div>

	{#await platforms then platoforms}
		<div>
			Available On
			{#each platformIDs as platformID}
				<div>
					{platoforms.find((platform) => platform.Platform_ID == platformID)?.Name}
				</div>
			{/each}
		</div>
	{/await}

	<div class="mt-5 flex justify-between">
		<button
			class="rounded-sm bg-blue-500 px-3 py-1 text-white"
			on:click={() => (showEdit = !showEdit)}>Edit</button
		>
		<button
			class="rounded-sm bg-red-500 px-3 py-1 text-white"
			on:click={() => (showDelete = !showDelete)}>Delete</button
		>
	</div>
</div>

<Modal bind:showModal={showEdit}>
	<h2 slot="header">{movie.Name}</h2>
	<!-- Movie edit form -->
	<form method="POST" use:enhance>
		<div class="flex flex-col gap-2">
			<label>
				<span class="text-sm">Name</span>
				<input type="text" name="Name" class="w-full bg-gray-100 p-2" value={movie.Name} />
			</label>
			<label>
				<span class="text-sm">URLs</span>
				<textarea name="URLs" class="w-full bg-gray-100 p-2" rows="5">{movie.URLs}</textarea>
			</label>
			<label>
				<span class="text-sm">Run Time (min)</span>
				<input
					type="number"
					name="Run_Time"
					class="w-full bg-gray-100 p-2"
					value={movie.Run_Time}
				/>
			</label>
			<button type="submit" class="w-full border-none bg-gray-800 p-2 text-white">Save</button>
		</div>
	</form>
</Modal>

<Modal bind:showModal={showDelete}>
	<h2 slot="header">Are you sure?</h2>
	<p>Do you really want to delete <b>{movie.Name}</b>?</p>
	<button
		slot="button"
		class="bg-red-500 p-2 text-white"
		on:click={() => ((showDelete = false), console.log('delete'))}>Delete</button
	>
</Modal>
