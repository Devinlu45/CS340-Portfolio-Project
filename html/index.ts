// main.ts
// This file contains the code for the homepage logic and interactions

import { getMovies, getPlatforms, getPlatformsByMovie, Movie } from "./src/database";

// Get the HTML elements
const searchForm = document.getElementById("search-form") as HTMLFormElement;
const searchInput = document.getElementById("search-input") as HTMLInputElement;
// const searchButton = document.getElementById("search-button") as HTMLButtonElement;
const searchResults = document.getElementById("search-results") as HTMLDivElement;
const preview = document.getElementById("preview") as HTMLDivElement;

class HTMLBuilder {
  private element: HTMLElement;

  constructor(tagName: string, classList: string[] = [], id = "") {
    this.element = document.createElement(tagName);
    this.element.classList.add(...classList);
    this.element.id = id;
  }

  addAttribute(attribute: string, value: any) {
    return this.element.setAttribute(attribute, value), this;
  }

  addText(text: string) {
    return (this.element.textContent = text), this;
  }

  addChild(child: HTMLElement) {
    return this.element.appendChild(child), this;
  }

  addClickEvent(callback: (e: Event) => void) {
    this.element.addEventListener("click", callback);
    return this;
  }

  replaceExisting(selector: string) {
    const existing = document.querySelector(selector);
    if (existing) {
      const idOfExisting = existing.id;
      existing.replaceWith(this.element);
      this.element.id = idOfExisting;
    }
    return this;
  }

  getElement() {
    return this.element;
  }
}

const loader = class Loader {
  private static instance: Loader;
  private static element: HTMLElement = document.getElementById("loader") as HTMLDivElement;
  private constructor() {}
  public static getInstance(): Loader {
    if (!Loader.instance) {
      Loader.instance = new Loader();
    }
    return Loader.instance;
  }
  show(): void {
    Loader.element.innerHTML = '<img src="loader.gif" alt="Loading..." />';
  }
  hide(): void {
    Loader.element.innerHTML = "";
  }
}.getInstance();

const popup = new (class Popup {
  private element: HTMLElement;
  constructor() {
    this.element = new HTMLBuilder("div", []).getElement();
    // setMovie(n)
  }
  setMovie(movie: Movie) {
    this.element = new HTMLBuilder("div", [])
      .addChild(
        new HTMLBuilder("div", ["popup-content"])
          .addChild(
            new HTMLBuilder("span", ["popup-close"])
              .addText("X")
              .addClickEvent(() => {
                this.hide();
              })
              .getElement()
          )
          .addChild(new HTMLBuilder("h3").addText(movie.Name).getElement())
          .addChild(new HTMLBuilder("p").addText(`Run time: ${movie.Run_Time} minutes`).getElement())
          .addChild(new HTMLBuilder("p").addText(`URLs: ${movie.URLs}`).getElement())
          .addChild(new HTMLBuilder("p").addText("Streaming services: <data will be populated here>").getElement())
          .addChild(
            new HTMLBuilder("button")
              .addText("Edit")
              .addClickEvent(() => {
                window.location.href = `./edit?movie_id=${movie.Movie_ID}`;
              })
              .getElement()
          )
          .getElement()
      )
      .replaceExisting("#popup")
      .getElement();

    getPlatformsByMovie(movie.Movie_ID)
      .then((platforms) => {
        let services = "";
        for (const platform of platforms) {
          services += `${platform.Name}, `;
        }
        services = services.slice(0, -2);
        this.element.appendChild(new HTMLBuilder("p").addText(services).getElement());
      })
      .catch((err) => {
        console.error(err);
      });
  }
  getElement() {
    return this.element;
  }
  show() {
    this.element.style.display = "block";
  }
  hide() {
    this.element.style.display = "none";
  }
})();

class MovieCard {
  private element: HTMLElement;
  constructor(movie: any) {
    this.element = new HTMLBuilder("div", ["card"])
      .addChild(new HTMLBuilder("h3").addText(movie.Name).getElement())
      .addChild(new HTMLBuilder("p").addText(`Run time: ${movie.Run_Time} minutes`).getElement())
      .addChild(new HTMLBuilder("button").addText("Details").getElement())
      .addClickEvent(() => {
        popup.setMovie(movie);
        popup.show();
      })
      .getElement();
  }
  getElement() {
    return this.element;
  }
}

// Event listeners
searchForm.addEventListener("submit", (e: SubmitEvent) => {
  if (!e.target) return;
  const formData = new FormData(e.target as HTMLFormElement);
  console.log(formData);

  e.preventDefault();
  preview.style.display = "none";
  loader.show();
  searchResults.innerHTML = "";

  const searchValue = searchInput.value;
  getMovies(searchInput.value)
    .then((movies) => {
      loader.hide();
      let added = 0;
      for (const movie of movies) {
        if (movie.Name.toLowerCase().includes(searchValue.toLowerCase())) {
          searchResults.appendChild(new MovieCard(movie).getElement());
          added++;
        }
      }

      if (added === 0) {
        searchResults.replaceChildren(
          new HTMLBuilder("p").addText("No results found").getElement(),
          new HTMLBuilder("button")
            .addText("Scrape the web")
            .addClickEvent(() => {
              console.log("Scrape the web");
            })
            .getElement(),
          new HTMLBuilder("a").addText("or Add manually").addAttribute("href", "./add").getElement()
        );
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

// Show the moview previews when load
getMovies()
  .then((movies) => {
    for (const movie of movies) {
      preview.appendChild(new MovieCard(movie).getElement());
    }
  })
  .catch((err) => {
    console.error(err);
  });

getPlatforms().then((platforms) => {
  const filters = document.querySelector("#filters #platforms");
  if (filters) {
    for (const platform of platforms) {
      filters.appendChild(new HTMLBuilder("label").addText(platform.Name).addChild(new HTMLBuilder("input").addAttribute("type", "checkbox").addAttribute("value", platform.Platform_ID).getElement()).getElement());
    }
  }
});
