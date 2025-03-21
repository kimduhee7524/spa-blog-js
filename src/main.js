import { header } from "./components/Header.js";

function main() {
  document.querySelector("#app").innerHTML = `
    <div class="app-container">
    ${header()}
      <main id="content" class="p-4"></main>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  main();
});
