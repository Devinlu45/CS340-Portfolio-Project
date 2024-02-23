// import type { ParamMatcher } from '@sveltejs/kit';
// import * as database from '../lib/database';

// export const match: ParamMatcher = (param) => {
// 	// Exports from src/lib/database.ts
// 	const exports = Object.keys(database);
// 	return exports.includes(param);
// };

// import { json, type RequestHandler } from '@sveltejs/kit';
// import * as database from '$lib/database';

// export const POST: RequestHandler = async ({ params, request }) => {
// 	const data = [await request.json()];
// 	const databaseFunction = database[params.fun as keyof typeof database];
// 	if (typeof databaseFunction !== 'function') {
// 		return json(
// 			{
// 				isError: true,
// 				result: `Function not found: ${params.fun}`
// 			},
// 			{
// 				status: 404
// 			}
// 		);
// 	}
// 	return json({
// 		// @ts-expect-error because of the dynamic nature of this route
// 		result: await databaseFunction(...data),
// 		isError: false
// 	});
// };
