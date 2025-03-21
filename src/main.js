import { header } from "./components/Header.js";
import { Home } from "./pages/Home.js";

function main() {
  document.querySelector("#app").innerHTML = `
    <div class="app-container">
    ${header()}
    ${Home()}
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  main();
});
