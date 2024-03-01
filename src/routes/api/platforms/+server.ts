import { getPlatforms } from '$lib/database';
import { json } from '@sveltejs/kit';

// /api/newsletter GET

export async function POST({ request }) {
	let data = await request.json();
	const platforms = await getPlatforms();
	return json(platforms);
}
