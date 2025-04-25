export function reactSystem() {
  let stateIndex = 0;
  let effectIndex = 0;
  const states = [];

  function useState(initState) {
    const index = stateIndex++;
    if (states.length === index) {
      states.push(initState);
    }

    const setState = (newVal) => {
      states[index] = newVal;
      render();
    };

    return [states[index], setState];
  }

  function render(componentFn, targetEl) {
    stateIndex = 0;
    effectIndex = 0;
    targetEl.innerHTML = componentFn();
    runEffects();
  }

  render();

  return { useState, render };
}
