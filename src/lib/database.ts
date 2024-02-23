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

export async function getMovies() {
	return [
		{
			Movie_ID: 100,
			Name: 'Barbie',
			Run_Time: 114,
			URLs: 'Watch Barbie | Now Streaming | Max'
		},
		{
			Movie_ID: 101,
			Name: 'Rustin',
			Run_Time: 108,
			URLs: 'Watch Rustin | Netflix Official Site'
		},
		{
			Movie_ID: 102,
			Name: 'Strays',
			Run_Time: 94,
			URLs: 'Watch Strays(2023) | Prime Video (amazon.com)'
		},
		{
			Movie_ID: 103,
			Name: 'Avenger: Endgame',
			Run_Time: 182,
			URLs: "Watch Marvel Studios' Avengers: Endgame | Disney +"
		}
	];
}

export async function getMoviesWithPlatforms(): Promise<{ movie: Movie; platformIDs: number[] }[]> {
	return [
		{
			movie: {
				Movie_ID: 100,
				Name: 'Barbie',
				Run_Time: 114,
				URLs: 'Watch Barbie | Now Streaming | Max'
			},
			platformIDs: [10002]
		},
		{
			movie: {
				Movie_ID: 101,
				Name: 'Rustin',
				Run_Time: 108,
				URLs: 'Watch Rustin | Netflix Official Site'
			},
			platformIDs: [10000]
		},
		{
			movie: {
				Movie_ID: 102,
				Name: 'Strays',
				Run_Time: 94,
				URLs: 'Watch Strays(2023) | Prime Video (amazon.com)'
			},
			platformIDs: [10001]
		},
		{
			movie: {
				Movie_ID: 103,
				Name: 'Avenger: Endgame',
				Run_Time: 182,
				URLs: "Watch Marvel Studios' Avengers: Endgame | Disney +"
			},
			platformIDs: [10003]
		}
	];
}

export async function getSeries() {
	return [
		{
			Series_ID: 100,
			Name: 'Cyberpunk: Edgerunner',
			Episode_Count: 10,
			Season_Count: 1,
			URLs: 'Watch Cyberpunk: Edgerunners | Netflix Official Si'
		},
		{
			Series_ID: 101,
			Name: 'The Boys',
			Episode_Count: 24,
			Season_Count: 3,
			URLs: 'Watch The Boys - Season 4 | Prime Video (amazon.co'
		},
		{
			Series_ID: 102,
			Name: 'The Last Of Us',
			Episode_Count: 9,
			Season_Count: 1,
			URLs: 'Watch The Last of Us (HBO) | Max'
		},
		{
			Series_ID: 103,
			Name: "Marvel's Jessica Jones",
			Episode_Count: 39,
			Season_Count: 3,
			URLs: 'Watch Jessica Jones | Disney + (disneyplus.com)'
		}
	];
}

export async function getSeriesWithPlatforms(): Promise<
	{ series: Series; platformIDs: number[] }[]
> {
	return [
		{
			series: {
				Series_ID: 100,
				Name: 'Cyberpunk: Edgerunner',
				Episode_Count: 10,
				Season_Count: 1,
				URLs: 'Watch Cyberpunk: Edgerunners | Netflix Official Si'
			},
			platformIDs: [10002]
		},
		{
			series: {
				Series_ID: 101,
				Name: 'The Boys',
				Episode_Count: 24,
				Season_Count: 3,
				URLs: 'Watch The Boys - Season 4 | Prime Video (amazon.co'
			},
			platformIDs: [10000]
		},
		{
			series: {
				Series_ID: 102,
				Name: 'The Last Of Us',
				Episode_Count: 9,
				Season_Count: 1,
				URLs: 'Watch The Last of Us (HBO) | Max'
			},
			platformIDs: [10001]
		},
		{
			series: {
				Series_ID: 103,
				Name: "Marvel's Jessica Jones",
				Episode_Count: 39,
				Season_Count: 3,
				URLs: 'Watch Jessica Jones | Disney + (disneyplus.com)'
			},
			platformIDs: [10003]
		}
	];
}

export async function getPlatforms() {
	return [
		{
			Platform_ID: 10000,
			Name: 'Netflix',
			Website: 'Netflix-Watch TV Shows Online',
			Price_ID: 101
		},
		{
			Platform_ID: 10001,
			Name: 'Max',
			Website: 'Max | The One to Watch',
			Price_ID: 100
		},
		{
			Platform_ID: 10002,
			Name: 'Amazon Prime Video',
			Website: 'Prime Video | Watch movies, TV shows, Live TV, and',
			Price_ID: 102
		},
		{
			Platform_ID: 10003,
			Name: 'Disney +',
			Website: 'Stream Disney, Pixar, Marvel, Star Wars, Nat Geo |',
			Price_ID: 103
		}
	];
}

export async function getPrices() {
	return [
		{
			Price_ID: 100,
			Price: 15.49,
			Has_Ads: false
		},
		{
			Price_ID: 101,
			Price: 15.99,
			Has_Ads: false
		},
		{
			Price_ID: 102,
			Price: 8.99,
			Has_Ads: false
		},
		{
			Price_ID: 103,
			Price: 13.99,
			Has_Ads: false
		}
	];
}

export async function getPlatformsByMovieID(id: number) {
	// const [rows] = await connection.query('SELECT * FROM Platform_Movies WHERE Movie_ID = ?', [id]);
	// const platforms = (rows as PlatformMovie[]).map((row) => row.Platform_ID);
	// return platforms;

	switch (id) {
		case 100:
			return [10001];
		case 101:
			return [10000];
		case 102:
			return [10002];
		case 103:
			return [10003];
	}
}

export async function getPlatformsBySeriesID(id: number) {
	// const [rows] = await connection.query('SELECT * FROM Platform_Series WHERE Series_ID = ?', [id]);
	// return rows as PlatformSeries[];

	switch (id) {
		case 100:
			return [10002];
		case 101:
			return [10000];
		case 102:
			return [10001];
		case 103:
			return [10003];
	}
}

export async function getRawTableData(
	tableName: string
): Promise<Movie[] | Series[] | Platform[] | PlatformMovie[] | PlatformSeries[] | Price[]> {
	switch (tableName) {
		case 'Movies':
			return [
				{
					Movie_ID: 100,
					Name: 'Barbie',
					Run_Time: 114,
					URLs: 'Watch Barbie | Now Streaming | Max'
				},
				{
					Movie_ID: 101,
					Name: 'Rustin',
					Run_Time: 108,
					URLs: 'Watch Rustin | Netflix Official Site'
				},
				{
					Movie_ID: 102,
					Name: 'Strays',
					Run_Time: 94,
					URLs: 'Watch Strays(2023) | Prime Video (amazon.com)'
				},
				{
					Movie_ID: 103,
					Name: 'Avenger: Endgame',
					Run_Time: 182,
					URLs: "Watch Marvel Studios' Avengers: Endgame | Disney +"
				}
			];
		case 'Series':
			return [
				{
					Series_ID: 100,
					Name: 'Cyberpunk: Edgerunner',
					Episode_Count: 10,
					Season_Count: 1,
					URLs: 'Watch Cyberpunk: Edgerunners | Netflix Official Si'
				},
				{
					Series_ID: 101,
					Name: 'The Boys',
					Episode_Count: 24,
					Season_Count: 3,
					URLs: 'Watch The Boys - Season 4 | Prime Video (amazon.co)'
				},
				{
					Series_ID: 102,
					Name: 'The Last Of Us',
					Episode_Count: 9,
					Season_Count: 1,
					URLs: 'Watch The Last of Us (HBO) | Max'
				},
				{
					Series_ID: 103,
					Name: "Marvel's Jessica Jones",
					Episode_Count: 39,
					Season_Count: 3,
					URLs: 'Watch Jessica Jones | Disney + (disneyplus.com)'
				}
			];
		case 'Platforms':
			return [
				{
					Platform_ID: 10000,
					Name: 'Netflix',
					Website: 'Netflix-Watch TV Shows Online',
					Price_ID: 101
				},
				{
					Platform_ID: 10001,
					Name: 'Max',
					Website: 'Max | The One to Watch',
					Price_ID: 100
				},
				{
					Platform_ID: 10002,
					Name: 'Amazon Prime Video',
					Website: 'Prime Video | Watch movies, TV shows, Live TV, and',
					Price_ID: 102
				},
				{
					Platform_ID: 10003,
					Name: 'Disney +',
					Website: 'Stream Disney, Pixar, Marvel, Star Wars, Nat Geo |',
					Price_ID: 103
				}
			];
		case 'Platform_Movies':
			return [
				{
					Movie_ID: 100,
					Platform_ID: 10001
				},
				{
					Movie_ID: 101,
					Platform_ID: 10000
				},
				{
					Movie_ID: 102,
					Platform_ID: 10002
				},
				{
					Movie_ID: 103,
					Platform_ID: 10003
				}
			];
		case 'Platform_Series':
			return [
				{
					Series_ID: 100,
					Platform_ID: 10002
				},
				{
					Series_ID: 101,
					Platform_ID: 10000
				},
				{
					Series_ID: 102,
					Platform_ID: 10001
				},
				{
					Series_ID: 103,
					Platform_ID: 10003
				}
			];
		case 'Prices':
			return [
				{
					Price_ID: 100,
					Price: 15.49,
					Has_Ads: false
				},
				{
					Price_ID: 101,
					Price: 15.99,
					Has_Ads: false
				},
				{
					Price_ID: 102,
					Price: 8.99,
					Has_Ads: false
				},
				{
					Price_ID: 103,
					Price: 13.99,
					Has_Ads: false
				}
			];
	}
	return [];
}
