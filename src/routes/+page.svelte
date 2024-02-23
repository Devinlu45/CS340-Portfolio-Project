<script lang="ts">
	import type { PageServerData } from './$types';
	import Loader from './Loader.svelte';
	import MovieCard from './MovieCard.svelte';
	import SeriesCard from './SeriesCard.svelte';

	export let data: PageServerData;

	let searchQuery = '';
	let platformFilter: number[] = [];

	$: filteredMovies = data.movies.then((movies) =>
		movies.filter((movie) => {
			if (searchQuery && !movie.movie.Name.toLowerCase().includes(searchQuery.toLowerCase()))
				return false;
			if (platformFilter.length === 0) return true;
			if (movie.platformIDs.some((id) => platformFilter.includes(id))) return true;
			return false;
		})
	);

	$: filteredSeries = data.series.then((series) =>
		series.filter((show) => {
			if (searchQuery && !show.series.Name.toLowerCase().includes(searchQuery.toLowerCase()))
				return false;
			if (platformFilter.length === 0) return true;
			if (show.platformIDs.some((id) => platformFilter.includes(id))) return true;
			return false;
		})
	);
</script>

<div class="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
	<h1 class="text-4xl font-bold">Movies Browsing Site</h1>
	<p class="text-lg">Find your favorite movies and where to watch them</p>
	<hr class="my-5" />
	<div class="flex flex-col gap-5">
		<div class="flex">
			<input
				bind:value={searchQuery}
				type="text"
				name="search"
				class="w-2/3 bg-gray-200 px-2"
				placeholder="Enter a movie name"
			/>
			<button type="submit" class="w-1/3 border-none bg-gray-800 p-2 text-white">Search</button>
		</div>

		<div class="flex flex-col">
			{#await data.platforms then platforms}
				<h2 class="text-2xl font-bold">Platform Filter</h2>
				<div class="flex gap-5">
					{#each platforms as platform}
						<label class="select-none">
							<input
								name="platform"
								type="checkbox"
								value={platform.Platform_ID}
								bind:group={platformFilter}
							/>
							{platform.Name}
						</label>
					{/each}
				</div>
			{/await}
		</div>
	</div>

	<hr class="my-5" />
	<h2 class="text-2xl font-bold">Movies
		<a href="/tables/Movies" class="text-blue-500 rounded-sm float-right text-base p-2">Go to Table View</a>
	</h2>
</div>

<div class="flex flex-wrap justify-center gap-5 p-5">
	{#await filteredMovies}
		<Loader />
	{:then movies}
		{#if movies.length === 0}
			<p>No movies found</p>
			<a href="/scrape" class="text-blue-500 underline">Scrape the Web</a>
			<a href="/scrape" class="text-blue-500 underline">or Add Manually</a>
		{:else}
			{#each movies as movie, i (movie.movie.Movie_ID)}
				<MovieCard {...movie} />
			{/each}
		{/if}
	{/await}
</div>

<div class="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
	<hr class="my-5" />
	<h2 class="text-2xl font-bold">
		Series
		<a href="/tables/Series" class="text-blue-500 rounded-sm float-right text-base p-2">Go to Table View</a>
	</h2>
</div>

<div class="flex flex-wrap justify-center gap-5 p-5">
	{#await filteredSeries}
		<Loader />
	{:then series}
		{#if series.length === 0}
			<p>No movies found</p>
			<a href="/" class="text-blue-500 underline">Scrape the Web</a>
			<a href="/tables/Series" class="text-blue-500 underline">or Add Manually</a>
		{:else}
			{#each series as show, i (show.series.Series_ID)}
				<SeriesCard {...show} />
			{/each}
		{/if}
	{/await}
</div>