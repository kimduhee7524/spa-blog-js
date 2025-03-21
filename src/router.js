export const router = function () {
  const routes = {};

  function addRoute(path, pageRenderer) {
    routes[path] = pageRenderer;
  }

  function render(path) {
    const pageRenderer = routes[path] || routes["/404"];
    if (pageRenderer) {
      document.querySelector("#content").innerHTML = pageRenderer();
    }
  }

  function navigateTo(path) {
    history.pushState(null, "", path);
    render(path);
  }

  function initRouter() {
    window.addEventListener("popstate", () => {
      const path = window.location.pathname || "/";
      render(path);
    });
    const path = window.location.pathname || "/";
    render(path);
    console.log(routes);
  }

  return { addRoute, navigateTo, initRouter };
};
