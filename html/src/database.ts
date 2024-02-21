export interface Movie {
  Movie_ID: number;
  Name: string;
  Run_Time: number;
  URLs: string;
}

export interface PlatformMovie {
  Movie_ID: number | null;
  Platform_ID: number | null;
}

export interface PlatformSeries {
  Series_ID: number | null;
  Platform_ID: number | null;
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

class DatabaseAPI {
  host = "localhost";
  user = "root";
  password = "password";
  database = "movies_db";

  connect(callback: (err: any) => void) {
    // Connect to the database
  }

  async query<T>(query: string): Promise<[err: any, results: T]> {
    // Query the database
    return [null, [] as any];
  }
}

const connection = new DatabaseAPI();

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
});

export async function getMovies(search: string | undefined = undefined): Promise<Movie[]> {
  // Query the database to select all the movies
  // const [err, results] = await connection.query<any[]>("SELECT * FROM Movies");
  // if (err) throw err;
  // else return results;

  // Return some dummy data for now
  return [
    { Movie_ID: 1, Name: "Movie 1", Run_Time: 120, URLs: "URL1" },
    { Movie_ID: 2, Name: "Movie 2", Run_Time: 150, URLs: "URL2" },
  ];
}

export async function getMovie(movie_id: number): Promise<Movie> {
  // Query the database to select the movie
  // const [err, results] = await connection.query<any[]>(`SELECT * FROM Movies WHERE Movie_ID = ${movie_id}`);
  // if (err) throw err;
  // else return results[0];

  // Return some dummy data for now
  return { Movie_ID: 1, Name: "Movie 1", Run_Time: 120, URLs: "URL1" };
}

export async function deleteMovie(movie_id: number): Promise<void> {
  // Delete the movie from the database
  // return connection.query(`DELETE FROM Movies WHERE Movie_ID = ${movie_id}`);
  return Promise.resolve();
}

export async function getPlatforms(): Promise<Platform[]> {
  // Query the database to select all the platforms
  // const [err, results] = await connection.query<any[]>("SELECT * FROM Platforms");

  // if (err) throw err;
  // else return results;

  // Return some dummy data for now
  return [
    { Platform_ID: 1, Name: "Platform 1", Website: "Website1", Price_ID: 1 },
    { Platform_ID: 2, Name: "Platform 2", Website: "Website2", Price_ID: 2 },
  ];
}

export async function getPlatformsByMovie(movie_id: number): Promise<Platform[]> {
  // Query the database to select the platforms that have the movie
  // const [err, results] = await connection.query<any[]>(`SELECT Platforms.* FROM Platforms JOIN Platform_Movies ON Platforms.Platform_ID = Platform_Movies.Platform_ID WHERE Platform_Movies.Movie_ID = ${movie_id}`);

  // if (err) throw err;
  // else return results;

  // Return some dummy data for now
  return [
    { Platform_ID: 1, Name: "Platform 1", Website: "Website1", Price_ID: 1 },
    { Platform_ID: 2, Name: "Platform 2", Website: "Website2", Price_ID: 2 },
  ];
}

export async function getMoviesByPlatform(platform_id: number): Promise<any[]> {
  // Query the database to select the movies that are on the platform
  // const [err, results] = await connection.query<any[]>(`SELECT Movies.* FROM Movies JOIN Platform_Movies ON Movies.Movie_ID = Platform_Movies.Movie_ID WHERE Platform_Movies.Platform_ID = ${platform_id}`);

  // if (err) throw err;
  // else return results;

  // Return some dummy data for now
  return [
    { Movie_ID: 1, Name: "Movie 1", Run_Time: 120, URLs: "URL1" },
    { Movie_ID: 2, Name: "Movie 2", Run_Time: 150, URLs: "URL2" },
  ];
}
