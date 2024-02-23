<script>
	import '../app.css';
</script>

<slot />
<div class="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
	<hr class="my-5" />
	<h2 class="text-2xl font-bold">All Tables</h2>
	<div class="flex justify-center gap-4">
		<a class="text-blue-500" href="/tables/Movies">Movies</a>
		<a class="text-blue-500" href="/tables/Series">Series</a>
		<a class="text-blue-500" href="/tables/Platforms">Platforms</a>
		<a class="text-blue-500" href="/tables/Prices">Prices</a>
		<a class="text-blue-500" href="/tables/Platform_Movies">Platform Movies</a>
		<a class="text-blue-500" href="/tables/Platform_Series">Platform Series</a>
	</div>
</div>