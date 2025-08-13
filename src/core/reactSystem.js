import { renderElement } from "./dom.js";

function createReactSystem() {
  let stateIndex = 0;
  let effectIndex = 0;

  let componentStates = []; // useState 값 저장
  let effectDeps = []; // useEffect deps 저장
  let effectCleanups = {}; // cleanup 저장
  let effects = []; // effect 콜백 저장

  let rootComponent = null;
  let rootContainer = null;

  function useState(initialValue) {
    const index = stateIndex++; // 각 상태가 저장된 위치 기억
    if (componentStates.length === index) {
      componentStates.push(initialValue);
    }

    const setState = (newValue) => {
      componentStates[index] = newValue;
      rerender();
    };

    return [componentStates[index], setState];
  }

  function useEffect(callback, deps) {
    const index = effectIndex++;
    const prevDeps = effectDeps[index]; // 이전 deps 가져오기

    // 이전 deps가 있는 경우에만 얕은 비교
    const hasChanged = !prevDeps || deps.some((d, i) => d !== prevDeps[i]);

    if (hasChanged) {
      effects.push({ callback, index });
      effectDeps[index] = deps;
    }
  }

  function render(componentFn, targetEl) {
    rootComponent = componentFn;
    rootContainer = targetEl;
    rerender();
  }

  function rerender() {
    stateIndex = 0;
    effectIndex = 0;

    // 이전 clean up 먼저 실행
    Object.entries(effectCleanups).forEach(([index, cleanUp]) => {
      if (typeof cleanUp === "function") {
        cleanUp();
      }
    });

    effectCleanups = {};
    effects = [];

    const vNode = rootComponent();
    renderElement(vNode, rootContainer);

    effects.forEach(({ callback, index }) => {
      // effect 실행 -> clean up 리턴
      const cleanUp = callback();
      if (typeof cleanUp === "function") {
        // clean up 저장
        effectCleanups[index] = cleanUp;
      }
    });
  }

  function clearStates() {
    componentStates = [];
    effectDeps = [];
    effectCleanups = {};
    stateIndex = 0;
    effectIndex = 0;
    effects = [];
  }

  return { useState, useEffect, render, clearStates };
}

export const reactSystem = createReactSystem();
