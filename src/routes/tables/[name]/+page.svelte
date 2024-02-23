<script lang="ts">
	import Modal from '../../Modal.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let showEdit = false;
	let showDelete = false;
	let showCreate = false;
	let rowID = 0;
</script>

<div class="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">

	<a href="/" class="font-bold">
		← Back
	</a>

	<h1 class="text-4xl font-bold">Manually Edit {data.tableName}</h1>
	<p class="text-lg">Edit the data in the table</p>

	<hr class="my-5" />
</div>
<div class="w-5/6 m-auto p-4">
	<table class="w-full">
		<thead>
			<tr class="bg-gray-200">
				<th></th>
				{#each Object.keys(data.table[0]) as key}
					<th>{key}</th>
				{/each}
				<th>Actions</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each data.table as row}
			<tr>
				<td class="w-4"></td>
				{#each Object.values(row) as value}
				<td>{value}</td>
				{/each}
				<td class="flex justify-end gap-1">
					<button
					class="rounded-sm bg-blue-500 px-3 py-1 text-white"
					on:click={() => ((showEdit = !showEdit), (rowID = Object.values(row)[0]))}
					>Edit</button
					>
					<button
					class="rounded-sm bg-red-500 px-3 py-1 text-white"
					on:click={() => ((showDelete = !showDelete), (rowID = Object.values(row)[0]))}
					>Delete</button
					>
				</td>
				<td class="w-4"></td>
			</tr>
			{/each}
		</tbody>
	</table>
	
	<button
		class="float-right rounded-sm bg-blue-500 px-3 py-1 text-white"
		on:click={() => (showCreate = !showCreate)}>Create New</button
	>
</div>

	<Modal bind:showModal={showEdit}>
		{@const row = data.table[rowID]}
		<h2 slot="header">Edit {rowID} in {data.tableName}</h2>
		<form method="PUT" action="/tables/{data.tableName}" class="flex flex-col gap-2 w-96">
			{#each Object.keys(data.table[0]) as key}
				<label>
					<span class="text-sm">{key}</span>
					<input type="text" name={key} class="w-full bg-gray-100 p-2" value={(() => {
						// @ts-expect-error It is the type of key
						data.table[0][key]
					})()}>
				</label>
			{/each}
			<button type="submit" class="w-full border-none bg-gray-800 p-2 text-white">Update</button>
		</form>
	</Modal>
	<Modal bind:showModal={showDelete}>
		<h2 slot="header">Delete {data.tableName}</h2>
		<form method="DELETE" action="/tables/{data.tableName}" class="flex flex-col gap-2">
			<p>Do you really want to delete {rowID}?</p>
			<button type="submit" class="w-full border-none bg-gray-800 p-2 text-white">Delete</button>
		</form>
	</Modal>
	<Modal bind:showModal={showCreate}>
		<h2 slot="header">Create New {data.tableName}</h2>
		<form method="POST" action="/tables/{data.tableName}" class="flex flex-col gap-2 w-96">
			{#each Object.keys(data.table[0]) as key}
				<label>
					<span class="text-sm">{key}</span>
					<input type="text" name={key} class="w-full bg-gray-100 p-2" />
				</label>
			{/each}
			<button type="submit" class="w-full border-none bg-gray-800 p-2 text-white">Create</button>
		</form>
	</Modal>
