# Movie viwer

## Usage

```bash
git clone <this repo>

cd <this repo>

npm install

npm run dev # for development

npm run build # for building it
```

## Files overview

These are the files for SvelteKit. SvelteKit is the framework we're using to build the website. It's a bit like HTML, but it's a lot easier to use. It's also a lot more flexible and has a lot more features.

[📁 .svelte-kit](.svelte-kit) This folder contains the generated files in the dev environment made by SvelteKit. You don't need to worry about the files in here and don't won't need to touch them.\
[📁 node_modules](node_modules) This also gets generated when you run install.\
[📁 static](static) The static folder doesn't get used by Svelte and just gets merged at the end. I currently only have the favicon in here and probably won't put anything else.

[📁 src](src) The src folder holds all of the important files that make the website.\
┃\
The `lib` folder holds the files that are used to interact with the database and the API. The `database.ts` file is used to interact with the database and current just holds teh dummy data. It being Typescript doesn't change anything, it just adds information about how the data should be structured.\
┣ [lib](src/lib)\
┃ ┗ [database.ts](src/lib/database.ts)\
┃\
The `routes` folder holds all of the pages and the API. The folders are laid out to define the paths of all the pages and pages on the website. For example the folder routes/+page.svelte it the main page or the website because it is the `+page` file in the top folder. In Svelte the pages and server apis are defined by using a `+`. Any `+page.svelte` is like an HTML page where you difine the content that goes at that route. `+page.ts` files are server files that can hold API response and code that runs when the page is loaded.\
┣ [routes](src/routes)\
The `api` folder defines the path/route for the API. This is not a strict requirement by Svelte and is just for organisation. Any server file in this folder will be available at `/api/...`.\
┃ ┣ [api](src/routes/api)\
┃ ┃ ┗ [platforms](src/routes/api/platforms)\
This API route, available at `/api/platforms`, is used to get all of the platforms that the movies and series are available on. This is available as an API so that some of the pages don't need to get the data on page load. This is used for edit dropdowns and the main page to get the names for all the platforms.\
┃ ┃ ┗ [+server.ts](src/routes/api/platforms/+server.ts)\
The `tables` folder holds the pages that show all of the data tables.\
┃ ┣ [tables](src/routes/tables)\
This `[name]` folder means that it is a dynamic route. I did this so I didn't have to make seperate pages for each table and can use the same one just with different names.\
┃ ┃ ┗ [[name]](src/routes/tables/[name])\
This is the server file that holds the page data. It is specifically a server page so that the server can get information from the database without needing a vpn because it is running on the same server.\
┃ ┃ ┣ [+page.server.ts](src/routes/tables/[name]/+page.server.ts)\
The page data returned by the server file is used here to populate a table and the names of the columns. This file is quite complex becasue it needs to work for any table.\
┃ ┃ ┗ [+page.svelte](src/routes/tables/[name]/+page.svelte)\
The `+layout.svelte` file is used to put the same footer on every page. It also loads the CSS for the whole project.\
┃ ┣ [+layout.svelte](src/routes/+layout.svelte)\
This is the main server file for the main page. It gets all of the data for the main page and returns it to the page.\
┃ ┣ [+page.server.ts](src/routes/+page.server.ts)\
This is the main page for the website. It gets all of the data from the server file and puts it into the page. It also has the search functionality that will filter all of the shows and movies to display to the user.\
┃ ┣ [+page.svelte](src/routes/+page.svelte)\
These four files below are some reusable components that are used in the main page. The `Loader.svelte` file is used to show a loading spinner when the page is loading. The `Modal.svelte` file is used to show a customizable popup that gets reused throughout the project. The `MovieCard.svelte` file is used to show a card for a movie and the `SeriesCard.svelte` file is used to show a card for a series.\
┃ ┣ [Loader.svelte](src/routes/Loader.svelte)\
┃ ┣ [Modal.svelte](src/routes/Modal.svelte)\
┃ ┣ [MovieCard.svelte](src/routes/MovieCard.svelte)\
┃ ┗ [SeriesCard.svelte](src/routes/SeriesCard.svelte)\
The `app.css` file is where Tailwind is loaded.\
┣ [app.css](src/app.css)\
The `app.d.ts` file is a TypeScript file that holds the types for some parts of the project. I am not currently using it but for type information that is needed across the whole project I would put it here. I will likely move the Database types from the `database.ts` file to this one.\
┣ [app.d.ts](src/app.d.ts)\
The `app.html` file is the main HTML file for the website. Svelte uses this to embed all of the above pages and components.\
┗ [app.html](src/app.html)

ESLint is package that checks code for errors and common usages bad code.\
[📄 .eslintignore](.eslintignore) This file is the ignore list (which files to not look at)\
[📄 .eslintrc.cjs](.eslintrc.cjs) This is the config to tell it how severe you want the errors to be.\

Along the same lines, Prettier is a code formatter that makes your code look nice and consistent.\
[📄 .prettierignore](.prettierignore) This is the ignore file for Prettier\
[📄 .prettierrc](.prettierrc) And this is the config file\

Tailwind and PostCSS are used to style the website. Tailwind uses PostCSS to generate the CSS, and Tailwind adds a bunch of CSS classes that act like individual properties. If you look at the HTML, you'll see a bunch of classes that look like `bg-blue-500` or `text-2xl`. These are all Tailwind classes and they just do what it says, ie set the background to blue and make the text 2 times larger.\
[📄 postcss.config.js](postcss.config.js) This is the config file for PostCSS\
[📄 tailwind.config.js](tailwind.config.js) This is the config file for Tailwind\

[📄 .npmrc](.npmrc) This is the config file for npm, which is the package manager we're using.\
[📄 svelte.config.js](svelte.config.js) This is the config file for Svelte, the framework we're using.\
[📄 tsconfig.json](tsconfig.json) This is the config file for TypeScript, the language we're using.\
[📄 vite.config.ts](vite.config.ts) This is the config file for Vite, the bundler we're using.\

[📄 pnpm-lock.yaml](pnpm-lock.yaml) This is the lock file for pnpm, the package manager we're using.\
[📄 .gitignore](.gitignore) This is the file ignore list for Git so unwanted files don't show up on GitHub\
[📄 package.json](package.json) This is the file that tells npm what to do when you run `npm install` or `npm run dev` or `npm run build`\
[📄 projectStep3Database.sql](projectStep3Database.sql) This is the SQL file that creates the database for the project\
[📄 README.md](README.md) This is the file you're reading right now\
