import { getPlatforms } from "../src/database";

getPlatforms().then((platforms) => {
  const select = document.querySelector("#add-platform");
  if (select) {
    for (const platform of platforms) {
      select.appendChild(new Option(platform.Name, platform.Platform_ID.toString()));
    }
  }
});

const formElement = document.querySelector("#add-form") as HTMLFormElement;
formElement.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  // const formData = new FormData(e.target as HTMLFormElement);

  window.history.back();
});
