// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Movie {
		Movie_ID: number;
		Name: string;
		Run_Time: number;
		URLs: string;
	}

	interface PlatformMovie {
		Movie_ID: number;
		Platform_ID: number;
	}

	interface PlatformSeries {
		Series_ID: number;
		Platform_ID: number;
	}

	interface Platform {
		Platform_ID: number;
		Name: string;
		Website: string;
		Price_ID: number | null;
	}

	interface Price {
		Price_ID: number;
		Price: number;
		Has_Ads: boolean;
	}

	interface Series {
		Series_ID: number;
		Name: string;
		Episode_Count: number;
		Season_Count: number;
		URLs: string;
	}
}

export {};
