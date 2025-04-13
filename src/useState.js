import { router } from "./router.js";

const myRouter = router();

let states = [];
let stateIndex = 0; // useState가 실행 된 횟수

export function useState(initState) {
  const currentIndex = stateIndex; // 각 상태가 저장된 위치 기억

  if (states.length === currentIndex) {
    states.push(initState);
  }

  const state = states[currentIndex]; //저장된 위치에서 상태를 꺼냄

  const setState = (newState) => {
    states[currentIndex] = newState;
    myRouter.render(window.location.pathname);
  };

  stateIndex++;
  return [state, setState];
}

export function resetStateIndex() {
  stateIndex = 0;
}

export function clearStates() {
  states = [];
  stateIndex = 0;
}
