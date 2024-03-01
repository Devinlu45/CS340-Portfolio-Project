import mysql from 'mysql2/promise';

const db = mysql.createPool({
	host: 'classmysql.engr.oregonstate.edu',
	user: 'cs340_lude',
	password: '5136',
	database: 'cs340_lude'
});

export async function getMovies(): Promise<Movie[]> {
	const query1 = 'SELECT * FROM Movies;';
	const result = await db.query(query1);
	return result[0] as Movie[];
}

export async function getMoviesWithPlatforms(): Promise<{ movie: Movie; platformIDs: number[] }[]> {
	const result = await getMovies();
	return result.map(function (x) {
		return { movie: x, platformIDs: [] };
	});
}

export async function createMovie(data: Movie): Promise<Movie> {}

export async function updateMovie(id: number, data: Movie): Promise<Movie> {}

export async function deleteMovie(id: number): Promise<void> {}

export async function getSeries(): Promise<Series[]> {
	const query1 = 'Select * FROM Series;';
	const result = await db.query(query1);
	return result[0] as Series[];
}

export async function getSeriesWithPlatforms(): Promise<
	{ series: Series; platformIDs: number[] }[]
> {
	const result = await getSeries();
	return result.map(function (x) {
		return { series: x, platformIDs: [] };
	});
}

export async function createSeries(data: Series): Promise<Series> {}

export async function updateSeries(id: number, data: Series): Promise<Series> {}

export async function deleteSeries(id: number): Promise<void> {}

export async function getPlatforms(): Promise<Platform[]> {
	const query1 = 'Select * FROM Platforms;';
	const result = await db.query(query1);
	return result[0] as Platform[];
}

export async function createPlatform(data: Platform): Promise<Platform> {}

export async function updatePlatform(id: number, data: Platform): Promise<Platform> {}

export async function deletePlatform(id: number): Promise<void> {}

export async function getPrices(): Promise<Price[]> {
	const query1 = 'Select * FROM Prices;';
	const result = await db.query(query1);
	return result[0] as Price[];
}

export async function createPrice(data: Price): Promise<Price> {}

export async function updatePrice(id: number, data: Price): Promise<Price> {}

export async function deletePrice(id: number): Promise<void> {}

export async function getPlatformsByMovieID(): Promise<PlatformMovie[]> {
	const query1 = 'Select * FROM Platform_Movies;';
	const result = await db.query(query1);
	return result[0] as PlatformMovie[];
}

export async function getPlatformsBySeriesID(): Promise<PlatformSeries[]> {
	const query1 = 'Select * FROM Platform_Series;';
	const result = await db.query(query1);
	return result[0] as PlatformSeries[];
}

export async function add_data(table_name: string, data, data1, data2, data3) {
	const query1 = `INSERT INTO ${table_name} (Movie_ID, Name, Run_Time, URLs) VALUES("${data}", "${data1}", "${data2}", "${data3}");`;
	const result = await db.query(query1);
	return result;
}

export async function delete_data(table_name: string, id: number) {
	const query1 = `DELETE FROM ${table_name} WHERE Movie_ID = ${id};`;
	const result = await db.query(query1);
	return result;
}

export async function patch_data(table_name: string, id: number, data, data1, data2) {
	const query1 = `UPDATE ${table_name} SET Movie_ID = ${id}, Name = "${data}", Run_Time = "${data1}", URLs = "${data2}" WHERE Movie_ID = ${id}; `;
	console.log(query1);
	const result = await db.query(query1);
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
	return [];
}

export async function createTableData(
	tableName: string,
	data: Movie | Series | Platform | Price
): Promise<Movie | Series | Platform | Price> {
	switch (tableName) {
		case 'Movies':
			return createMovie(data as Movie);
	}
	return data;
}

export async function updateTableData(
	tableName: string,
	id: number,
	data: Movie | Series | Platform | Price
): Promise<Movie | Series | Platform | Price> {
	switch (tableName) {
		case 'Movies':
			return updateMovie(id, data as Movie);
	}
	return data;
}
export async function deleteTableData(tableName: string, id: number): Promise<void> {
	switch (tableName) {
		case 'Movies':
			return deleteMovie(id);
	}
}

export async function getRawTableData(
	tableName: string
): Promise<Movie[] | Series[] | Platform[] | PlatformMovie[] | PlatformSeries[] | Price[]> {
	switch (tableName) {
		case 'Movies':
			return getMovies();
		case 'Series':
			return getSeries();
		case 'Platforms':
			return getPlatforms();
		case 'Platform_Movies':
			return getPlatformsByMovieID();
		case 'Platform_Series':
			return getPlatformsBySeriesID();
		case 'Prices':
			return getPrices();
	}
	return [];
}
