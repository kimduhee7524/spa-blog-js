import { createVirtualElement } from "./core/dom.js";

const createRouter = (function () {
  let instance;

  function createRouter() {
    const routes = [];
    const listeners = []; // URL 변경 시 실행할 콜백 함수 저장

    function addRoute(path, component) {
      const paramNames = [];
      const regexPath = path.replace(/:([^/]+)/g, (_, paramName) => {
        paramNames.push(paramName);
        return "([^/]+)";
      });
      const regex = new RegExp("^" + regexPath + "$");

      // 정적 갯수 계산
      const staticCount = path
        .split("/")
        .filter((p) => p && !p.startsWith(":")).length;

      routes.push({ path, regex, paramNames, component, staticCount });

      // 정적 갯수 많은 순서로 정렬
      routes.sort((a, b) => b.staticCount - a.staticCount);
    }

    function getCurrentComponent(path = window.location.pathname) {
      for (const route of routes) {
        const match = path.match(route.regex);
        if (match) {
          const params = {};
          route.paramNames.forEach((name, i) => {
            params[name] = match[i + 1];
          });
          return () => createVirtualElement(route.component, params);
        }
      }
      return null;
    }

    function navigateTo(path) {
      if (window.location.pathname !== path) {
        history.pushState(null, "", path);
        listeners.forEach((fn) => fn(path));
      }
    }

    function listen(fn) {
      listeners.push(fn);
    }

    function start() {
      window.addEventListener("popstate", () => {
        const path = window.location.pathname || "/";
        listeners.forEach((fn) => fn(path));
      });
    }

    return {
      addRoute,
      getCurrentComponent,
      navigateTo,
      listen,
      start,
    };
  }

  return function () {
    if (!instance) {
      instance = createRouter();
    }
    return instance;
  };
})();

export const router = createRouter();
