import { router } from "./router.js";
import { header } from "./components/Header.js";
import { Home } from "./pages/Home.js";
import { NotFound } from "./pages/NotFound.js";
import { PostDetail } from "./pages/PostDetail.js";

const myRouter = router();
myRouter.addRoute("/", Home);
myRouter.addRoute("/404", NotFound);
myRouter.addRoute("/post/:id", PostDetail);

function main() {
  document.querySelector("#app").innerHTML = `
    <div class="app-container">
    ${header()}
    <main id="content" class="bg-gray-100 min-h-screen flex justify-center"></main>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  main();
  myRouter.initRouter();
});

document.body.addEventListener("click", (e) => {
  const card = e.target.closest(".post-card");
  if (card) {
    const postId = card.dataset.postId;
    myRouter.navigateTo(`/post/${postId}`);
  }
});

document.body.addEventListener("click", (e) => {
  const homeBtn = e.target.closest(".home-btn");
  if (homeBtn) {
    myRouter.navigateTo("/");
  }
});
