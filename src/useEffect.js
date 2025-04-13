const effectQueue = [];
const effectHistory = [];
let effectIndex = 0;

export function useEffect(callback, deps) {
  const currentIndex = effectIndex++;

  // deps가 []이고, 처음 실행인 경우
  if (Array.isArray(deps) && deps.length === 0) {
    const alreadyRun = effectHistory[currentIndex];

    if (!alreadyRun) {
      effectQueue.push(callback);
      effectHistory[currentIndex] = true;
    }
  } else {
    effectQueue.push(callback);
  }
}

export function runEffects() {
  effectQueue.forEach((cb) => cb());
  effectQueue.length = 0; // 큐 초기화
  effectIndex = 0; //  useEffect 실행 순서 초기화
}
