const effectQueue = [];
const effectDeps = [];
let effectIndex = 0;

export function useEffect(callback, deps) {
  const currentIndex = effectIndex++;

  if (Array.isArray(deps)) {
    const prevDeps = effectDeps[currentIndex];
    let hasChanged = false;

    if (!prevDeps) {
      hasChanged = true;
    } else {
      for (let i = 0; i < deps.length; i++) {
        if (deps[i] !== prevDeps[i]) {
          hasChanged = true;
          break;
        }
      }
    }

    if (hasChanged) {
      effectQueue.push(callback);
      effectDeps[currentIndex] = deps;
    }
  } else {
    // 의존성 배열이 없으면 항상 실행
    effectQueue.push(callback);
  }
}

export function runEffects() {
  effectQueue.forEach((cb) => cb());
  effectQueue.length = 0; // 큐 초기화
  effectIndex = 0; //  useEffect 실행 순서 초기화
}
