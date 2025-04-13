import { router } from "./router.js";

const myRouter = router();

let state = undefined;

export function useState(initState) {
  if (state === undefined) {
    state = initState;
  }
  const setState = (newState) => {
    state = newState;

    myRouter.render(window.location.pathname);
  };
  return [() => state, setState];
}
