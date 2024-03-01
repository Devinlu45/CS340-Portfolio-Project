import { getRawTableData } from '$lib/database';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { add_data } from '$lib/database';
import { delete_data } from '$lib/database';
import { patch_data } from '$lib/database';

export const actions = {
	async post({ params, request }) {
		const tableName = params.name;
		const data = await request.formData();

		const MovieID = data.get('Movie_ID');
		const MovieName = data.get('Name');
		const Run_Time = data.get('Run_Time');
		const Urls = data.get('URLs');

		const result = await add_data(tableName, MovieID, MovieName, Run_Time, Urls);
		console.log(result);
	},
	async delete({ params, request }) {
		const tableName = params.name;
		const data = await request.formData();

		const ID = data.get('id');

		const result = await delete_data(tableName, ID);
		console.log(result);
	},
	async patch({ params, request }) {
		const tableName = params.name;
		const data = await request.formData();

		const MovieID = data.get('Movie_ID');
		const MovieName = data.get('Name');
		const Run_Time = data.get('Run_Time');
		const Urls = data.get('URLs');

		const result = await patch_data(tableName, MovieID, MovieName, Run_Time, Urls);
		console.log(result);
	}
};

export const load = (async ({ params }) => {
	const tableName = params.name;
	if (
		!['Movies', 'Series', 'Platforms', 'Prices', 'Platform_Movies', 'Platform_Series'].includes(
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
