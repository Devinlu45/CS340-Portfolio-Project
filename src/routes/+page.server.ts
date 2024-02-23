import { getMoviesWithPlatforms, getPlatforms, getSeriesWithPlatforms } from '$lib/database';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		movies: getMoviesWithPlatforms(),
		series: getSeriesWithPlatforms(),
		platforms: getPlatforms()
	};
}) satisfies PageServerLoad;
