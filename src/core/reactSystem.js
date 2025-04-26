import { renderElement } from "./dom.js";

function createReactSystem() {
  let stateIndex = 0; 
  let states = [];  // 상태와 useEffect deps 저장장
  let effects = [];  // effect 콜백 저장
  let rootComponent = null;
  let rootContainer = null;

  function useState(initialValue) {
    const index = stateIndex++; // 각 상태가 저장된 위치 기억
    if (states.length === index) {
      states.push(initialValue);
    }

    const setState = (newValue) => {
      states[index] = newValue;
      rerender();
    };

    return [states[index], setState];
  }

  function useEffect(callback, deps) {
    const index = stateIndex++;
    const prevDeps = states[index]; // 이전 deps 가져오기

    let hasChanged = false;

    if (!prevDeps) {
      hasChanged = true;
    } else {
      // 이전 deps가 있는 경우에만 얕은 비교
      for (let i = 0; i < deps.length; i++) {
        if (deps[i] !== prevDeps[i]) {
          hasChanged = true;
          break;
        }
      }
    }

    // 이전 deps가 없거나 deps가 변경된 경우에만 effect 저장
    if (hasChanged) {
      effects.push({ callback, index }); // 나중에 clean-up을 찾기 위해 index도 저장
      states[index] = deps;
    }
  }

  function render(componentFn, targetEl) {
    rootComponent = componentFn;
    rootContainer = targetEl;
    rerender();
  }

  function rerender() {
    stateIndex = 0;
    // 이전 clean up 먼저 실행
    effects.forEach(({ index }) => {
      const cleanUp = states[`c-${index}`];
      if (typeof cleanUp === "function") {
        cleanUp();
      }
    });
    effects = [];
    const vNode = rootComponent();
    renderElement(vNode, rootContainer);
    
    effects.forEach(({ callback, index }) => {
      // effect 실행 -> clean up 리턴
      const cleanUp = callback();  
      if (typeof cleanUp === "function") {
        // clean up 저장
        states[`c-${index}`] = cleanUp;  
      }
    });
  }

  function clearStates() {
    states = [];
    stateIndex = 0;
    effects = [];
  }

  return { useState, useEffect, render, clearStates };
}

export const reactSystem = createReactSystem();
