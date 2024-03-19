import { table } from 'console';
import mysql from 'mysql2/promise';

// export async function getMovies(): Promise<Movie[]> {}
export async function createMovie(data: Movie): Promise<Movie> {}
export async function updateMovie(id: number, data: Movie): Promise<Movie> {}
export async function deleteMovie(id: number): Promise<void> {}

// export async function getSeries(): Promise<Series[]> {}
export async function createSeries(data: Series): Promise<Series> {}
export async function updateSeries(id: number, data: Series): Promise<Series> {}
export async function deleteSeries(id: number): Promise<void> {}

// export async function getPlatforms(): Promise<Platform[]> {}
export async function createPlatform(data: Platform): Promise<Platform> {}
export async function updatePlatform(id: number, data: Platform): Promise<Platform> {}
export async function deletePlatform(id: number): Promise<void> {}

// export async function getPrices(): Promise<Price[]> {}
export async function createPrice(data: Price): Promise<Price> {}
export async function updatePrice(id: number, data: Price): Promise<Price> {}
export async function deletePrice(id: number): Promise<void> {}

const db = mysql.createPool({
	host: 'classmysql.engr.oregonstate.edu',
	user: 'cs340_lude',
	password: '5136',
	database: 'cs340_lude'
});

export interface Movie {
	Movie_ID: number;
	Name: string;
	Run_Time: number;
	URLs: string;
}

export interface PlatformMovie {
	Movie_ID: number;
	Platform_ID: number;
}

export interface PlatformSeries {
	Series_ID: number;
	Platform_ID: number;
}

export interface Platform {
	Platform_ID: number;
	Name: string;
	Website: string;
	Price_ID: number | null;
}

export interface Price {
	Price_ID: number;
	Price: number;
	Has_Ads: boolean;
}

export interface Series {
	Series_ID: number;
	Name: string;
	Episode_Count: number;
	Season_Count: number;
	URLs: string;
}

export async function getMovies(): Promise<Movie[]> {
	let query1 = 'SELECT * FROM Movies;';
	var result = await db.query(query1);
	return result[0] as Movie[];
}

export async function getMoviesWithPlatforms(): Promise<{ movie: Movie; platformIDs: number[] }[]> {
	var result = await getMovies();
	return result.map(function (x) {
		return { movie: x, platformIDs: [] };
	});
}

export async function getSeries(): Promise<Series[]> {
	let query1 = 'Select * FROM Series;';
	var result = await db.query(query1);
	return result[0] as Series[];
}

export async function getSeriesWithPlatforms(): Promise<
	{ series: Series; platformIDs: number[] }[]
> {
	var result = await getSeries();
	return result.map(function (x) {
		return { series: x, platformIDs: [] };
	});
}

export async function getPlatforms(): Promise<Platform[]> {
	let query1 = 'Select * FROM Platforms;';
	var result = await db.query(query1);
	return result[0] as Platform[];
}

export async function getPrices(): Promise<Price[]> {
	let query1 = 'Select * FROM Prices;';
	var result = await db.query(query1);
	return result[0] as Price[];
}

export async function getPlatformsByMovieID(): Promise<PlatformMovie[]> {
	let query1 = 'Select * FROM Platform_Movies;';
	var result = await db.query(query1);
	return result[0] as PlatformMovie[];
}

export async function getPlatformsBySeriesID(): Promise<PlatformSeries[]> {
	let query1 = 'Select * FROM Platform_Series;';
	var result = await db.query(query1);
	return result[0] as PlatformSeries[];
}

export async function getID(data) {
	let query1 = `Select Platform_ID from Platforms where Price = ${data}`;
	var result = await db.query(query1);
	const x = result[0][0];
	const y = x.Platform_ID.toString();
	return y;
}

export async function add_data(table_name, data, data1, data2, data3) {
	let query1 = `INSERT INTO ${table_name} (Movie_ID, Name, Run_Time, URLs) VALUES("${data}", "${data1}", "${data2}", "${data3}");`;
	var result = await db.query(query1);
	return result;
}

export async function add_data_series(table_name, data, data1, data2, data3, data4) {
	let query1 = `INSERT INTO ${table_name} (Series_ID, Name, Episode_Count, Season_Count, URLs) VALUES("${data}", "${data1}", "${data2}", "${data3}", "${data4}");`;
	var result = await db.query(query1);
	return result;
}

export async function add_platform(table_name, data, data1, data2, data3) {
	let query1 = `INSERT INTO ${table_name} (Platform_ID, Name, Website, Price) VALUES("${data}", "${data1}", "${data2}", "${data3}");`;
	var result = await db.query(query1);
	return result;
}

export async function add_Prices(table_name, data, data1, data2) {
	let query1 = `INSERT INTO ${table_name} (Price_ID, Price, Has_Ads) VALUES("${data}", "${data1}", "${data2}");`;
	var result = await db.query(query1);
	return result;
}

export async function add_PM(table_name, data, data1) {
	let query1 = `INSERT INTO ${table_name} (Movie_ID, Platform_ID) VALUES("${data}", "${data1}");`;
	var result = await db.query(query1);
	return result;
}

export async function add_PS(table_name, data, data1) {
	let query1 = `INSERT INTO ${table_name} (Series_ID, Platform_ID) VALUES("${data}", "${data1}");`;
	var result = await db.query(query1);
	return result;
}

export async function delete_data(table_name, id) {
	let query1 = `DELETE FROM ${table_name} WHERE Movie_ID = ${id};`;
	const result = await db.query(query1);
	return result;
}

export async function delete_series(table_name, id) {
	let query1 = `DELETE FROM ${table_name} WHERE Series_ID = ${id};`;
	const result = await db.query(query1);
	return result;
}

export async function delete_platform(table_name, id) {
	let query1 = `DELETE FROM ${table_name} WHERE Price_ID = ${id};`;
	const result = await db.query(query1);
	return result;
}

export async function delete_price(table_name, id) {
	let query1 = `DELETE FROM ${table_name} WHERE Platform_ID = ${id};`;
	const result = await db.query(query1);
	return result;
}

export async function patch_data(table_name, id, data, data1, data2) {
	let query1 = `UPDATE ${table_name} SET Movie_ID = ${id}, Name = "${data}", Run_Time = "${data1}", URLs = "${data2}" WHERE Movie_ID = ${id}; `;
	console.log(query1);
	var result = await db.query(query1);
	return result;
}

export async function patch_platforms(table_name, id, data, data1, data2) {
	let query1 = `UPDATE ${table_name} SET Platform_ID = ${id}, Name = "${data}", Website = "${data1}", Price = "${data2}" WHERE Platform_ID = ${id};`;
	console.log(query1);
	var result = await db.query(query1);
	return result;
}

export async function patch_series(table_name, id, data, data1, data2, data3) {
	let query1 = `UPDATE ${table_name} SET Series_ID = ${id}, Name = "${data}", Episode_Count = "${data1}", Season_Count = "${data2}", URLs = "${data3}" WHERE Series_ID = ${id};`;
	console.log(query1);
	var result = await db.query(query1);
	return result;
}

export async function patch_price(table_name, id, data, data1) {
	let query1 = `UPDATE ${table_name} SET Price_ID = ${id}, Price = "${data}", Has_Ads = "${data1}" WHERE Price_ID = ${id};`;
	console.log(query1);
	var result = await db.query(query1);
	return result;
}

export async function patch_PM(table_name, id, data) {
	let query1 = `UPDATE ${table_name} SET Movie_ID = ${id}, Platform_ID = "${data}" WHERE Movie_ID = ${id};`;
	console.log(query1);
	var result = await db.query(query1);
	return result;
}

export async function patch_PS(table_name, id, data) {
	let query1 = `UPDATE ${table_name} SET Series_ID = ${id}, Platform_ID = "${data}" WHERE Series_ID = ${id};`;
	console.log(query1);
	var result = await db.query(query1);
	return result;
}

export async function getTableData(
	tableName: string
): Promise<Movie[] | Series[] | Platform[] | Price[]> {
	switch (tableName) {
		case 'Movies':
			return getMovies();
		case 'Series':
			return getSeries();
		case 'Platforms':
			return getPlatforms();
		case 'Prices':
			return getPrices();
	}
}

export async function createTableData(
	tableName: string,
	data: Movie | Series | Platform | Price
): Promise<Movie | Series | Platform | Price> {
	switch (tableName) {
		case 'Movies':
			return createMovie(data);
	}
}

export async function updateTableData(
	tableName: string,
	id: number,
	data: Movie | Series | Platform | Price
): Promise<Movie | Series | Platform | Price> {
	switch (tableName) {
		case 'Movies':
			return updateMovie(id, data);
	}
}
export async function deleteTableData(tableName: string, id: number): Promise<void> {
	switch (tableName) {
		case 'Movies':
			return deleteMovie(id);
	}
}

export async function getRawTableData(tableName: string) {
	const query = `SELECT * FROM ${tableName};`;
	const [result] = await db.query(query);

	switch (tableName) {
		case 'Movies':
			return {
				name: 'Movies',
				columns: {
					Movie_ID: {
						type: 'number',
						editable: false,
						nullable: false
					},
					Name: {
						type: 'string',
						editable: true,
						nullable: false
					},
					Run_Time: {
						type: 'number',
						editable: true,
						nullable: false
					},
					URLs: {
						type: 'string',
						editable: true,
						nullable: false
					}
				},
				rows: result as Movie[],
				primaryKey: 'Movie_ID',
				foreignKeys: []
			};
		case 'Series':
			return {
				name: 'Series',
				columns: {
					Series_ID: {
						type: 'number',
						editable: false,
						nullable: false
					},
					Name: {
						type: 'string',
						editable: true,
						nullable: false
					},
					Episode_Count: {
						type: 'number',
						editable: true,
						nullable: false
					},
					Season_Count: {
						type: 'number',
						editable: true,
						nullable: false
					},
					URLs: {
						type: 'string',
						editable: true,
						nullable: false
					}
				},
				rows: result as Series[],
				primaryKey: 'Series_ID',
				foreignKeys: []
			};
		case 'Platforms':
			return {
				name: 'Platforms',
				columns: {
					Platform_ID: {
						type: 'number',
						editable: false,
						nullable: false
					},
					Name: {
						type: 'string',
						editable: true,
						nullable: false
					},
					Website: {
						type: 'string',
						editable: true,
						nullable: false
					},
					Price_ID: {
						type: 'number',
						editable: true,
						nullable: true
					}
				},
				rows: result as Platform[],
				primaryKey: 'Platform_ID',
				foreignKeys: [
					{
						table: 'Prices',
						column: 'Price_ID',
						values: getPrices().then((prices) => {
							return prices.map((price) => {
								return {
									id: price.Price_ID,
									value: price.Price.toString()
								};
							});
						})
					}
				]
			};
		case 'Prices':
			return {
				name: 'Prices',
				columns: {
					Price_ID: {
						type: 'number',
						editable: false,
						nullable: false
					},
					Price: {
						type: 'number',
						editable: true,
						nullable: false
					},
					Has_Ads: {
						type: 'boolean',
						editable: true,
						nullable: false
					}
				},
				rows: result as Price[],
				primaryKey: 'Price_ID',
				foreignKeys: []
			};
		case 'Platform_Movies':
			return {
				name: 'Platform_Movies',
				columns: {
					Movie_ID: {
						type: 'number',
						editable: true,
						nullable: false
					},
					Platform_ID: {
						type: 'number',
						editable: true,
						nullable: false
					}
				},
				rows: result as PlatformMovie[],
				nullable: [],
				primaryKey: 'Movie_ID|Platform_ID',
				foreignKeys: [
					{
						table: 'Movies',
						column: 'Movie_ID',
						values: getMovies().then((movies) => {
							return movies.map((movie) => {
								return {
									id: movie.Movie_ID,
									value: movie.Name
								};
							});
						})
					},
					{
						table: 'Platforms',
						column: 'Platform_ID',
						values: getPlatforms().then((platforms) => {
							return platforms.map((platform) => {
								return {
									id: platform.Platform_ID,
									value: platform.Name
								};
							});
						})
					}
				]
			};
		case 'Platform_Series':
			return {
				name: 'Platform_Series',
				columns: {
					Series_ID: {
						type: 'number',
						editable: true,
						nullable: false
					},
					Platform_ID: {
						type: 'number',
						editable: true,
						nullable: false
					}
				},
				rows: result as PlatformSeries[],
				primaryKey: '',
				foreignKeys: [
					{
						table: 'Series',
						column: 'Series_ID',
						values: getSeries().then((series) => {
							return series.map((s) => {
								return {
									id: s.Series_ID,
									value: s.Name
								};
							});
						})
					},
					{
						table: 'Platforms',
						column: 'Platform_ID',
						values: getPlatforms().then((platforms) => {
							return platforms.map((platform) => {
								return {
									id: platform.Platform_ID,
									value: platform.Name
								};
							});
						})
					}
				]
			};
		default:
			throw new Error('Invalid table name');
	}
}
