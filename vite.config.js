// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        add: resolve(__dirname, "add/index.html"),
        edit: resolve(__dirname, "edit/index.html"),
      },
    },
  },
  base: "/~schmitia/cs340project/",
});
