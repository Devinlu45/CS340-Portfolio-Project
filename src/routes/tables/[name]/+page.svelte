<script lang="ts">
	import { enhance } from '$app/forms';
	import { keyof } from 'valibot';
	import Loader from '../../Loader.svelte';
	import Modal from '../../Modal.svelte';
	import type { ActionData, PageServerData } from './$types';

	export let data: PageServerData;

	let showEdit = false;
	let showDelete = false;
	let showCreate = false;
	let modalRow: Record<string, any> = {};
	$: modalRowId = modalRow[data.primaryKey];
	let modalBuffering = false;
	let modalErrors: string[] = [];

	// Sorting and filtering state
	let sortBy: keyof typeof data.columns = data.primaryKey; // Default sorting column
	let sortOrder: 'asc' | 'desc' = 'asc'; // Default sorting order
	let filterText: string = '';

	$: sortedRows = (filterText, sortRows(filterRows(data.rows)));

	function couldYouPleaseCloseTheModalForMe() {
		showEdit = false;
		showDelete = false;
		showCreate = false;
	}

	function bufferModal() {
		modalBuffering = true;
		modalErrors = [];

		return ({ update, result }: { update: () => void; result: any }) => {
			modalBuffering = false;

			if (result.type == 'failure') {
				modalErrors = result.data.errors;
				return;
			}
			couldYouPleaseCloseTheModalForMe();

			update();
		};
	}

	function displayType(value: any, columns: typeof data.columns, key: string) {
		const type = columns[key as keyof typeof columns]!.type;
		if (type === 'boolean') {
			return value ? 'true' : 'false';
		}
		return value;
	}

	// Function to sort rows based on current sorting criteria
	function sortRows(rows: any[]) {
		return rows.slice().sort((a, b) => {
			const aValue = a[sortBy];
			const bValue = b[sortBy];

			if (aValue === bValue) return 0;

			if (sortOrder === 'asc') {
				return aValue > bValue ? 1 : -1;
			} else {
				return aValue < bValue ? 1 : -1;
			}
		});
	}

	// Function to filter rows based on filter text
	function filterRows(rows: any[]) {
		if (!filterText) return rows;

		const filterColumns = Object.keys(data.columns);

		return rows.filter((row) =>
			filterColumns.some((key) =>
				String(row[key as keyof typeof row])
					.toLowerCase()
					.includes(filterText.toLowerCase())
			)
		);
	}
</script>

<div class="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
	<a href="/" class="font-bold"> ← Home </a>

	<!-- Warning Banner -->
	{#if data.name == 'Platform_Movies' || data.name == 'Platform_Series'}
		<div
			class="relative my-2 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
			role="alert"
		>
			<strong class="font-bold">Warning!</strong>
			<span class="block sm:inline">
				The delete and edit operations are not implemented for this table yet.
			</span>
		</div>
	{/if}

	<h1 class="text-4xl font-bold">Manually Edit {data.name}</h1>
	<p class="text-lg">Edit the data in the table</p>

	<hr class="my-5" />
</div>

<div class="m-auto w-5/6 p-4">
	<div class="mb-4 flex items-center justify-between">
		<div>
			<label for="filter" class="sr-only">Filter</label>
			<input
				type="text"
				id="filter"
				placeholder="Filter..."
				class="rounded-md bg-gray-200 px-3 py-1"
				bind:value={filterText}
			/>
		</div>
		<div>
			<label for="sortBy" class="mr-2">Sort by:</label>
			<select id="sortBy" class="rounded-md bg-gray-200 px-3 py-1" bind:value={sortBy}>
				{#each Object.entries(data.columns) as [key, column]}
					<option value={key}>{key}</option>
				{/each}
			</select>
			<select class="rounded-md bg-gray-200 px-3 py-1" bind:value={sortOrder}>
				<option value="asc">Ascending</option>
				<option value="desc">Descending</option>
			</select>
		</div>
	</div>

	<table class="w-full">
		<thead>
			<tr class="bg-gray-200">
				<th></th>
				{#each Object.entries(data.columns) as column}
					<th>{column[0]}</th>
				{/each}
				<th>Actions</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#if sortedRows.length === 0}
				<tr>
					<td class="w-4"></td>
					<td class="text-center" colspan={Object.values(data.columns).length + 2}>No data found</td
					>
					<td class="w-4"></td>
				</tr>
			{/if}
			{#each sortedRows as row}
				{@const thisRow = row[data.primaryKey]}
				<tr>
					<td class="w-4"></td>
					{#each Object.entries(row) as [key, value]}
						<td>
							{displayType(value, data.columns, key)}
							{#if data.foreignKeys.filter((fk) => fk.column === key).length > 0}
								{#await data.foreignKeys.filter((fk) => fk.column === key)[0].values then values}
									({values.filter((fk) => fk.id === value)[0].value})
								{/await}
							{/if}
						</td>
					{/each}
					<td class="flex justify-end gap-1">
						<button
							class="rounded-sm bg-blue-500 px-3 py-1 text-white"
							on:click={() => {
								showEdit = !showEdit;
								modalRow = row;
								modalRowId = thisRow;
							}}>Edit</button
						>
						<button
							class="rounded-sm bg-red-500 px-3 py-1 text-white"
							on:click={() => {
								showDelete = !showDelete;
								modalRow = row;
								modalRowId = thisRow;
							}}>Delete</button
						>
					</td>
					<td class="w-4"></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<div class="flex w-full justify-center">
	<button
		class="rounded-sm bg-blue-500 px-3 py-1 text-white"
		on:click={() => (showCreate = !showCreate)}>Create New</button
	>
</div>

<Modal bind:showModal={showEdit}>
	<h2 slot="header">Edit {modalRowId} in {data.name}</h2>
	<form
		method="POST"
		action="/tables/{data.name}?/patch"
		class="flex w-96 flex-col gap-2"
		use:enhance={bufferModal}
	>
		{#if modalErrors.length > 0}
			<div class="rounded border border-red-400 bg-red-100 p-4 text-red-700">
				<strong class="font-bold">Errors:</strong>
				<ul class="list-inside list-disc">
					{#each modalErrors as error}
						<li>{error}</li>
					{/each}
				</ul>
			</div>
		{/if}
		<input type="hidden" name={data.primaryKey} value={modalRowId} />
		{#each Object.entries(data.columns) as columns}
			{#if columns[1].editable}
				{@const key = columns[0]}
				{@const foreignKey = data.foreignKeys.find((fk) => fk.column === key)}
				{#if foreignKey}
					<label>
						<span class="text-sm">{foreignKey.column}</span>
						<select name={foreignKey.column} class="w-full bg-gray-100 p-2">
							{#await foreignKey.values}
								<option value="" selected> Loading... </option>
							{:then values}
								{#each values as foreignRow}
									<option value={foreignRow.id} selected={foreignRow.id == modalRow[key]}>
										{foreignRow.value}
									</option>
								{/each}
							{/await}
						</select>
					</label>
				{:else}
					<label>
						<span class="text-sm">{key}</span>
						<input type="text" name={key} class="w-full bg-gray-100 p-2" value={modalRow[key]} />
					</label>
				{/if}
			{/if}
		{/each}
		<button
			type="submit"
			class="flex w-full items-center justify-center gap-2 border-none bg-gray-800 p-2 text-white"
		>
			{#if modalBuffering}
				<Loader size={16} />
				Updating...
			{:else}
				Update
			{/if}
		</button>
	</form>
</Modal>

<Modal bind:showModal={showDelete}>
	<h2 slot="header">Delete {data.name}</h2>
	<form
		method="POST"
		action="/tables/{data.name}?/delete"
		class="flex flex-col gap-2"
		use:enhance={bufferModal}
	>
		{#if modalErrors.length > 0}
			<div class="rounded border border-red-400 bg-red-100 p-4 text-red-700">
				<strong class="font-bold">Errors:</strong>
				<ul class="list-inside list-disc">
					{#each modalErrors as error}
						<li>{error}</li>
					{/each}
				</ul>
			</div>
		{/if}
		<p>Do you really want to delete {modalRowId}?</p>
		<input type="hidden" name="id" value={modalRowId} />
		<button
			type="submit"
			class="flex w-full items-center justify-center gap-2 border-none bg-red-800 p-2 text-white"
		>
			{#if modalBuffering}
				<Loader size={16} />
				Deleting...
			{:else}
				Delete
			{/if}
		</button>
	</form>
</Modal>

<Modal bind:showModal={showCreate}>
	<h2 slot="header">Create New {data.name}</h2>
	<form
		method="POST"
		action="/tables/{data.name}?/post"
		class="flex w-96 flex-col gap-2"
		use:enhance={bufferModal}
	>
		{#if modalErrors.length > 0}
			<div class="rounded border border-red-400 bg-red-100 p-4 text-red-700">
				<strong class="font-bold">Errors:</strong>
				<ul class="list-inside list-disc">
					{#each modalErrors as error}
						<li>{error}</li>
					{/each}
				</ul>
			</div>
		{/if}
		{#each Object.entries(data.columns) as column}
			{#if column[1].editable}
				{@const key = column[0]}
				{@const foreignKey = data.foreignKeys.find((fk) => fk.column === key)}
				{#if foreignKey}
					<label>
						<span class="text-sm">{foreignKey.column}</span>
						<select name={foreignKey.column} class="w-full bg-gray-100 p-2">
							{#await foreignKey.values}
								<option value="" selected> Loading... </option>
							{:then values}
								{#each values as foreignRow}
									<option value={foreignRow.id} selected={foreignRow.id == modalRow[key]}>
										{foreignRow.value}
									</option>
								{/each}
							{/await}
						</select>
					</label>
				{:else}
					<label>
						<span class="text-sm">{key}</span>
						<input type="text" name={key} class="w-full bg-gray-100 p-2" />
					</label>
				{/if}
			{/if}
		{/each}
		<button
			type="submit"
			class="flex w-full items-center justify-center gap-2 border-none bg-gray-800 p-2 text-white"
		>
			{#if modalBuffering}
				<Loader size={16} />
				Creating...
			{:else}
				Create
			{/if}
		</button>
	</form>
</Modal>
