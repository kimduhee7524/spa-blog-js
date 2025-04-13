const effectQueue = [];

export function useEffect(callback) {
  effectQueue.push(callback);
}

export function runEffects() {
  effectQueue.forEach((cb) => cb());
  effectQueue.length = 0; // 큐 초기화
}
