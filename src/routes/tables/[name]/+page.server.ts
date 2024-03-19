import {
	add_PM,
	add_PS,
	add_Prices,
	add_data_series,
	add_platform,
	delete_platform,
	delete_price,
	delete_series,
	getRawTableData,
	patch_PM,
	patch_PS,
	patch_platforms,
	patch_price,
	patch_series
} from '$lib/database';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { add_data } from '$lib/database';
import { delete_data } from '$lib/database';
import { patch_data } from '$lib/database';
import { getID } from '$lib/database';

export const actions = {
	async post({ params, request }) {
		const tableName = params.name;
		console.log(tableName);
		const data = await request.formData();
		console.log(data);
		switch (tableName) {
			case 'Movies':
				const MovieID = data.get('Movie_ID');
				console.log(MovieID);
				const MovieName = data.get('Name');
				console.log(MovieName);
				const Run_Time = data.get('Run_Time');
				console.log(Run_Time);
				const Urls = data.get('URLs');
				console.log(Urls);
				if (MovieID === '' || MovieName === '' || Run_Time === '') {
				} else {
					let result = await add_data('Movies', MovieID, MovieName, Run_Time, Urls);
					break;
				}
			case 'Series':
				const SeriesID = data.get('Series_ID');
				const SeriesName = data.get('Name');
				const episodeCount = data.get('Episode_Count');
				const seasonCount = data.get('Season_Count');
				const seriesUrl = data.get('URLs');
				if (
					SeriesID === '' ||
					SeriesName === '' ||
					episodeCount === '' ||
					seasonCount === '' ||
					seriesUrl === ''
				) {
				} else {
					let seriesResult = await add_data_series(
						'Series',
						SeriesID,
						SeriesName,
						episodeCount,
						seasonCount,
						seriesUrl
					);
					break;
				}
			case 'Platforms':
				const PlatformID = data.get('Platform_ID');
				const PlatformName = data.get('Name');
				const platformWebsite = data.get('Website');
				const platformPrice = data.get('Price');
				if (
					PlatformID === '' ||
					PlatformName === '' ||
					platformWebsite === '' ||
					platformPrice === ''
				) {
				} else {
					let platformResult = await add_platform(
						'Platforms',
						PlatformID,
						PlatformName,
						platformWebsite,
						platformPrice
					);
					break;
				}
			case 'Prices':
				const PriceID = data.get('Price_ID');
				const money = data.get('Price');
				const ads = data.get('Has_Ads');
				if (PriceID === '' || money === '' || ads === '') {
				} else {
					let priceResult = await add_Prices('Prices', PriceID, money, ads);
					break;
				}
			case 'Platform_Movies':
				const M_ID = data.get('Movie_ID');
				const P_ID = data.get('Platform_ID');
				let p_m_results = await add_PM('Platform_Movies', M_ID, P_ID);
				break;
			case 'Platform_Series':
				const S_ID = data.get('Series_ID');
				const Plat_ID = data.get('Platform_ID');
				let p_s_results = await add_PS('Platform_Series', S_ID, Plat_ID);
				break;
		}
	},
	async delete({ params, request }) {
		let tableName = params.name;
		const data = await request.formData();
		switch (tableName) {
			case 'Movies':
				const ID = data.get('id');
				let deletepm = await delete_data('Platform_Movies', ID);
				let result = await delete_data('Movies', ID);
				break;
			case 'Platform_Movies':
				const PM_ID = data.get('id');
				let deleteagain = await delete_data('Platform_Movies', PM_ID);
				break;
			case 'Series':
				const S_ID = data.get('id');
				let delete2 = await delete_series('Platform_Series', S_ID);
				let sResult = await delete_series('Series', S_ID);
				break;
			case 'Platform_Series':
				const ps_id = data.get('id');
				let delete3 = await delete_series('Platform_Series', ps_id);
				break;
			case 'Prices':
				const price_id = data.get('id');
				const platf_id = await getID(price_id);
				let answer = await delete_price('Platform_Movies', platf_id);
				let answer1 = await delete_price('Platform_Series', platf_id);
				let answer2 = await delete_price('Platforms', platf_id);
				let answer3 = await delete_platform('Prices', price_id);
				break;
			case 'Platforms':
				const Price_2 = data.get('id');
				let delete6 = await delete_price('Platform_Movies', Price_2);
				let delete8 = await delete_price('Platform_Series', Price_2);
				let delete7 = await delete_price(tableName, Price_2);
				break;
		}
	},
	async patch({ params, request }) {
		console.log('This is running patch');
		const tableName = params.name;
		const data = await request.formData();
		switch (tableName) {
			case 'Movies':
				const MovieID = data.get('Movie_ID');
				const MovieName = data.get('Name');
				const Run_Time = data.get('Run_Time');
				const Urls = data.get('URLs');
				if (MovieID === '' || MovieName === '' || Run_Time === '') {
				} else {
					let result = await patch_data(tableName, MovieID, MovieName, Run_Time, Urls);
					break;
				}
			case 'Series':
				const SeriesID = data.get('Series_ID');
				const seriesName = data.get('Name');
				const episodeCount = data.get('Episode_Count');
				const seasonCount = data.get('Season_Count');
				const seriesUrl = data.get('URLs');
				if (
					SeriesID === '' ||
					seriesName === '' ||
					episodeCount === '' ||
					seasonCount === '' ||
					seriesUrl === ''
				) {
				} else {
					let seriesResult = await patch_series(
						tableName,
						SeriesID,
						seriesName,
						episodeCount,
						seasonCount,
						seriesUrl
					);
					break;
				}
			case 'Prices':
				const PriceID = data.get('Price_ID');
				const amount = data.get('Price');
				const boo_ads = data.get('Has_Ads');
				if (PriceID === '' || amount === '' || boo_ads === '') {
				} else {
					let priceResult = await patch_price(tableName, PriceID, amount, boo_ads);
					break;
				}
			case 'Platform_Movies':
				const movie_id = data.get('Movie_ID');
				const platform_id = data.get('Platform_ID');
				let pmResult = await patch_PM(tableName, movie_id, platform_id);
				break;
			case 'Platform_Series':
				const series_id = data.get('Series_ID');
				const p_id = data.get('Platform_ID');
				let psResult = await patch_PS(tableName, series_id, p_id);
				break;
			case 'Platforms':
				const platform_ID = data.get('Platform_ID');
				const platformName = data.get('Name');
				const site = data.get('Website');
				const prid = data.get('Price');
				if (platform_ID === '' || platformName === '' || site === '' || prid === '') {
				} else {
					let theResult = await patch_platforms(tableName, platform_ID, platformName, site, prid);
					break;
				}
		}
	}
};

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
