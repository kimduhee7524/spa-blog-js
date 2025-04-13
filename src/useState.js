import { router } from "./router.js";

const myRouter = router();

let states = [];
let stateIndex = 0; // useState가 실행 된 횟수

// 랜더링시 stateIndex 초기화
const originalRender = myRouter.render;
myRouter.render = function (path) {
  stateIndex = 0;
  return originalRender.call(this, path);
};

// 페이지 이동 시 상태 초기화
const originalNavigateTo = myRouter.navigateTo;
myRouter.navigateTo = function (path) {
  states = [];
  stateIndex = 0;
  return originalNavigateTo.call(this, path);
};

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
