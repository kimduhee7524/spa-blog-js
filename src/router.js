export const router = (function () {
  let instance;

  function createRouter() {
    const routes = [];

    function addRoute(path, pageRenderer) {
      const paramNames = [];
      const regexPath = path.replace(/:([^/]+)/g, (_, paramName) => {
        paramNames.push(paramName);
        return "([^/]+)";
      });
      const regex = new RegExp("^" + regexPath + "$");

      routes.push({
        path,
        regex,
        paramNames,
        pageRenderer,
      });
    }

    function render(path) {
      for (const route of routes) {
        const match = path.match(route.regex);
        if (match) {
          const params = {};
          route.paramNames.forEach((name, i) => {
            params[name] = match[i + 1];
          });

          const html = route.pageRenderer(params);
          document.querySelector("#content").innerHTML = html;
          return;
        }
      }

      const notFound = routes.find((r) => r.path === "/404");
      if (notFound) {
        let contentElement = document.querySelector("#content");

        if (!contentElement) {
          contentElement = document.createElement("main");
          contentElement.id = "content";
          contentElement.className =
            "bg-gray-100 min-h-screen flex justify-center";
          document.body.appendChild(contentElement);
        }
        contentElement.innerHTML = notFound.pageRenderer();
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
  }

  return function () {
    if (!instance) {
      instance = createRouter();
    }
    return instance;
  };
})();
