import { getRawTableData } from '$lib/database';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const tableName = params.name;
	if (
		!['Movies', 'Series', 'Platforms', 'Platform_Movies', 'Platform_Series', 'Prices'].includes(
			tableName
		)
	)
		throw error(404, 'Not found');

	const data = await getRawTableData(tableName);

	return {
		tableName: tableName,
		table: data
	};
}) satisfies PageServerLoad;
