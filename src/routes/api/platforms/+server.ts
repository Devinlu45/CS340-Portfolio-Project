import { getPlatforms } from '$lib/database';
import { json } from '@sveltejs/kit';

// /api/newsletter GET

export async function POST() {
	const platforms = await getPlatforms();
	return json(platforms);
}
