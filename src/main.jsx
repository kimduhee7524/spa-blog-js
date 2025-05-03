import { reactSystem } from "./core/reactSystem.js";
import { router } from "./router.js";

import App from "./App.jsx";

import { Home } from "./pages/Home.jsx";
import { PostDetail } from "./pages/PostDetail.jsx";
import { PostComments } from "./pages/PostComments.jsx";
import { NotFound } from "./pages/NotFound.jsx";

const { render } = reactSystem;


router.addRoute("/", Home);
router.addRoute("/post/:id", PostDetail);
router.addRoute("/post/:id/comments/:commentId", PostComments);
router.addRoute("/404", NotFound);

function main() {
  const root = document.querySelector("#app");

  render(App, root);

  router.listen(() => {
    reactSystem.clearStates();
    render(App, root);
  });

  router.start();
}

document.addEventListener("DOMContentLoaded", main);

