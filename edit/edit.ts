import { getMovie, getPlatforms } from "../src/database";

const movie_id = new URLSearchParams(window.location.search).get("movie_id");
if (!movie_id) {
  window.location.href = "/";
}

const formElement = document.querySelector("#edit-form") as HTMLFormElement;
getMovie(+movie_id!).then((movie) => {
  console.log(movie);
  (formElement.querySelector("#edit-name") as HTMLInputElement).value = movie.Name;
  (formElement.querySelector("#edit-runtime") as HTMLInputElement).value = movie.Run_Time.toString();
});

getPlatforms().then((platforms) => {
  const select = document.querySelector("#edit-platform");
  if (select) {
    for (const platform of platforms) {
      select.appendChild(new Option(platform.Name, platform.Platform_ID.toString()));
    }
  }
});

formElement.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  // const formData = new FormData(e.target as HTMLFormElement);

  window.history.back();
});
