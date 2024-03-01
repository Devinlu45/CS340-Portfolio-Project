import { allDatabaseTables, getRawTableData, postRawTableData } from '$lib/database';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const tableName = params.name;
	if (!allDatabaseTables.includes(tableName)) throw error(404, 'Not found');

	const data = await getRawTableData(tableName);

	return {
		tableName: tableName,
		table: data
	};
}) satisfies PageServerLoad;

/* This goes into the `src/routes/tables/[name]/+page.server.ts` */

// Actions are the functions that are called when a request is made to the server
// ie. when a user makes a POST, DELETE, or PATCH request to the server then the
// corresponding action is called.
// The forms on the tables page, when the submit button is clicked, will make a
// POST, DELETE, or PATCH request depending on the action the user wants to do.
// Create, Delete, or Update.
//
// The `request` object is what contains the network request data. Similarly to
// how the `req` object in Express contains the request data.
//
// The `params` object is what contains the parameters from the URL. For example,
// if the URL is `/tables/Movies` then the `params.name` would be 'Movies'.
// If the URL is `/tables/Series` then the `params.name` would be 'Series'.
export const actions = {
	async post({ params, request }) {
		// This is the name of the table currently being accessed / updated
		// e.g. 'Movies', 'Series', 'Platforms', 'Prices', 'Platform_Movies', 'Platform_Series'
		// It should be checked (like above) to ensure it's a valid table name
		const tableName = params.name;
		// Form data is data sent from the client in a form
		// Data can be accessed by usign `data.get('key')` where `key` is the name of the input
		// All of the keys in here will be the column names of the table
		// For example, if the table is 'Movies', you can get the movie id by using `data.get('Movie_ID')`
		// To find all the keys for each table you can do `Object.keys(await getRawTableData(tableName)[0])`
		const data = await request.formData();

		// Here is were the data needs to be checked and validated to make sure it's in the correct format
		// and that it's valid. This is also where the data should be sanitized to prevent SQL injection
		// attacks. I don't know if this is a requirement for this project, but it's a good practice to do.

		// Because this is a POST request, the data should be inserted into the table as a new row
		// You will need to make a function in the database file that can insert based on the table
		// name just like the `getRawTableData` function. This function should take the table name and
		// the data as arguments and return the result of the insert query.

		let result /* =  ... */;

		return {
			status: 201,
			body: result
		};
	},
	async delete({ params, request }) {
		console.log('delete');
		const tableName = params.name;

		// This data will only have one key, 'id', which is the id of the row to delete
		const data = await request.formData();
		console.log(data);
		console.log(data.get('id'));

		// The id should be checked to make sure it's a valid id and that it exists in the table
		// This is also where the data should be sanitized to prevent SQL injection attacks.

		// Because this is a DELETE request, the row with the given id should be deleted from the table
		// You will need to make a function in the database file that can delete based on the table
		// name just like the `getRawTableData` function. This function should take the table name and
		// the id as arguments and return the result of the delete query.

		let result /* =  ... */;

		return {
			status: 204,
			body: result
		};
	},
	async patch({ params, request }) {
		const tableName = params.name;

		// Just like with the POST request, there will be a key for each column in the table
		// and the value will be the new value for that column.
		const data = await request.formData();

		// The id should be checked to make sure it's a valid id and that it exists in the table
		// This is also where the data should be sanitized to prevent SQL injection attacks.

		// Because this is a PATCH request, the row with the given id should be updated in the table
		// You will need to make a function in the database file that can update based on the table
		// name just like the `getRawTableData` function. This function should take the table name, the
		// id, and the data as arguments and return the result of the update query.

		let result /* =  ... */;

		return {
			status: 200,
			body: result
		};
	}
};

/*
A bit of information about the type information and Typescript
export async function createMovie(data: Movie): Promise<Movie>    <-- The angle brackets are called generics and they tell another
                                  ^--^  ^---^   ^------------^        type what type to use. In this case it is telling the Promise
 This is a function parameter and |     |       |                     type what type of data it is promising to return.
 can be any variable name               |       |                     (A promise is what async functions return and can be awaited)
                                        |       | 
This is the type of the parameter and  -|       | This is the return type of the function (everything after the colon)
can by any defined type                 |       | It's what the function will return when it's called
ie string, number, boolean, etc.
or a custom type like Movie, Series, Platform, Price, etc.
*/

/* These should all go into the `database.ts` file */
// export async function getMovies(): Promise<Movie[]> {}
// export async function createMovie(data: Movie): Promise<Movie> {}
// export async function updateMovie(id: number, data: Movie): Promise<Movie> {}
// export async function deleteMovie(id: number): Promise<void> {}

// export async function getSeries(): Promise<Series[]> {}
// export async function createSeries(data: Series): Promise<Series> {}
// export async function updateSeries(id: number, data: Series): Promise<Series> {}
// export async function deleteSeries(id: number): Promise<void> {}

// export async function getPlatforms(): Promise<Platform[]> {}
// export async function createPlatform(data: Platform): Promise<Platform> {}
// export async function updatePlatform(id: number, data: Platform): Promise<Platform> {}
// export async function deletePlatform(id: number): Promise<void> {}

// export async function getPrices(): Promise<Price[]> {}
// export async function createPrice(data: Price): Promise<Price> {}
// export async function updatePrice(id: number, data: Price): Promise<Price> {}
// export async function deletePrice(id: number): Promise<void> {}

// export async function getTableData(
// 	tableName: string
// ): Promise<Movie[] | Series[] | Platform[] | Price[]> {
// 	switch (tableName) {
// 		case 'Movies':
// 			return getMovies();
// 		case 'Series':
// 			return getSeries();
// 		case 'Platforms':
// 			return getPlatforms();
// 		case 'Prices':
// 			return getPrices();
// 	}
// }
// export async function createTableData(
// 	tableName: string,
// 	data: Movie | Series | Platform | Price
// ): Promise<Movie | Series | Platform | Price> {
// 	// Do a similar switch statement to the one above to call the correct create function
// }
// export async function updateTableData(
// 	tableName: string,
// 	id: number,
// 	data: Movie | Series | Platform | Price
// ): Promise<Movie | Series | Platform | Price> {
// 	// Do a similar switch statement to the one above to call the correct create function
// }
// export async function deleteTableData(tableName: string, id: number): Promise<void> {
// 	// Do a similar switch statement to the one above to call the correct create function
// }
