import { createRealElement } from "./core/dom.js"; // 가상돔 → 진짜 DOM

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

    function renderRoute(path) {
      for (const route of routes) {
        const match = path.match(route.regex);
        if (match) {
          const params = {};
          route.paramNames.forEach((name, i) => {
            params[name] = match[i + 1];
          });

          const vnode = route.pageRenderer(params); // JSX → VDOM
          const container = document.querySelector("#content");

          if (container) {
            const el = createRealElement(vnode); // VDOM → DOM
            container.innerHTML = ""; // 기존 내용 초기화
            container.appendChild(el); // 새로 렌더링된 DOM 붙이기
          }

          return;
        }
      }

      // 404 fallback 처리
      const notFound = routes.find((r) => r.path === "/404");
      if (notFound) {
        const vnode = notFound.pageRenderer();
        let container = document.querySelector("#content");

        if (!container) {
          container = document.createElement("main");
          container.id = "content";
          container.className = "bg-gray-100 min-h-screen flex justify-center";
          document.body.appendChild(container);
        }

        const el = createRealElement(vnode);
        container.innerHTML = "";
        container.appendChild(el);
      }
    }

    function navigateTo(path) {
      history.pushState(null, "", path);
      renderRoute(path);
    }

    function initRouter() {
      window.addEventListener("popstate", () => {
        const path = window.location.pathname || "/";
        renderRoute(path);
      });

      const path = window.location.pathname || "/";
      renderRoute(path);
    }

    return {
      addRoute,
      navigateTo,
      initRouter,
      render: renderRoute, // 외부에서 접근 가능하게
    };
  }

  return function () {
    if (!instance) {
      instance = createRouter();
    }
    return instance;
  };
})();
