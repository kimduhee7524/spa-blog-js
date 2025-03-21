export const router = function () {
  const routes = [];

  function addRoute(path, pageRenderer) {
    const regex = new RegExp("^" + path.replace(/:([^/]+)/g, "([^/]+)") + "$");
    routes.push({
      path,
      regex,
      pageRenderer,
    });
  }

  function render(path) {
    for (const route of routes) {
      const match = path.match(route.regex);
      if (match) {
        const param = match[1];
        const html = route.pageRenderer(param);
        document.querySelector("#content").innerHTML = html;
        return;
      }
    }

    const notFound = routes.find((r) => r.path === "/404");
    if (notFound) {
      document.querySelector("#content").innerHTML = notFound.pageRenderer();
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
