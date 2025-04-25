/** @jsx createVirtualElement */
import { createVirtualElement, render } from "./core/dom.js";
import { router } from "./router.js";
import "./style.css";
import "./renderController.js";

import App from "./App.jsx";
import { Home } from "./pages/Home.jsx";
import { NotFound } from "./pages/NotFound.js";
import { PostDetail } from "./pages/PostDetail.js";
import { PostComments } from "./pages/PostComments.js";

const myRouter = router();
myRouter.addRoute("/", Home);
myRouter.addRoute("/404", NotFound);
myRouter.addRoute("/post/:id", PostDetail);
myRouter.addRoute("/post/:id/comments/:commentId", PostComments);

function main() {
  const root = document.querySelector("#app");
  render(<App />, root);
}

document.addEventListener("DOMContentLoaded", () => {
  main();
  myRouter.initRouter();
});

document.body.addEventListener("click", (e) => {
  const navElement = e.target.closest("[data-route]");
  if (navElement) {
    const route = navElement.dataset.route;
    myRouter.navigateTo(route);
  }
});
