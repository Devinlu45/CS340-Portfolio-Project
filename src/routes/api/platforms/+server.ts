import { getPlatforms } from '$lib/database';
import { json } from '@sveltejs/kit';

// /api/newsletter GET

export async function GET() {
	const platforms = await getPlatforms();
	return json(platforms);
}
