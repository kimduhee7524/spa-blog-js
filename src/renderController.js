import { router } from "./router.js";
import { resetStateIndex, clearStates } from "./useState.js";
import { runEffects } from "./useEffect.js";

const myRouter = router();

// 렌더링 시
const originalRender = myRouter.render;
myRouter.render = function (path) {
  resetStateIndex();
  const result = originalRender.call(this, path);
  runEffects();
  return result;
};

// 페이지 이동 시
const originalNavigate = myRouter.navigateTo;
myRouter.navigateTo = function (path) {
  clearStates();
  const result = originalNavigate.call(this, path);
  runEffects();
  return result;
};

export { myRouter };
