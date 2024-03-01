import { getRawTableData } from '$lib/database';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { add_data } from '$lib/database';
import { delete_data } from '$lib/database';
import { patch_data } from '$lib/database';
import { table } from 'console';

export const actions = {
	async post({params, request}) {
		const tableName = params.name;
		const data = await request.formData();
		const MovieID = data.get('Movie_ID');
		const MovieName = data.get('Name');
		const Run_Time = data.get('Run_Time');
		const Urls = data.get('URLs');
		let result = await add_data('Movies', MovieID, MovieName, Run_Time, Urls)
	},
	async delete({ params, request }) {
		console.log("This is running delete")
		const tableName = params.name;
		const data = await request.formData();
		const ID = data.get('id');
		console.log(ID)
		let result = await delete_data(tableName, ID)
	},
	async patch({ params, request}){
		console.log("This is running patch")
		const tableName = params.name;
		const data = await request.formData();
		const MovieID = data.get('Movie_ID');
		const MovieName = data.get('Name');
		const Run_Time = data.get('Run_Time');
		const Urls = data.get('URLs');
		let result = await patch_data(tableName, MovieID, MovieName, Run_Time, Urls)
	},

}



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