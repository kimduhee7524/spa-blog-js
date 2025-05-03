let oldVNode = null;

export function createVirtualElement(type, props, ...children) {
  return {
    type,
    props: props || {},
    children: children.flat(),
  };
}

export function createRealElement(vNode) {
  // console.log("vnode", vNode);

  // 텍스트인 경우
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }

  // 배열인 경우
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((child) => fragment.appendChild(createRealElement(child)));
    return fragment;
  }

  // 컴포넌트 함수인 경우
  if (typeof vNode.type === "function") {
    return createRealElement(
      vNode.type({ ...vNode.props, children: vNode.children })
    );
  }

  // 일반 태그인 경우
  const el = document.createElement(vNode.type);

  // 속성 붙이기
  for (const [key, value] of Object.entries(vNode.props || {})) {
    if (key === "className") {
      el.setAttribute("class", value);
    } else if (key === "disabled") {
      el.disabled = Boolean(value);
    } else if (key === "value") {
      el.value = value;
    } else if (key === "style") {
      for (const [styleKey, styleValue] of Object.entries(value)) {
        el.style[styleKey] = styleValue;
      }
    } else if (key.startsWith("on") && typeof value === "function") {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      el.setAttribute(key, value);
    }
  }

  // 자식 붙이기
  if (vNode.children) {
    vNode.children.forEach((child) => {
      el.appendChild(createRealElement(child));
    });
  }

  return el;
}

function updateElement(parent, oldVNode, newVNode, index = 0) {
  const targetDom = parent.childNodes[index];

  // 텍스트 노드 인 경우
  if (typeof oldVNode === "string" || typeof oldVNode === "number") {
    if (typeof newVNode === "string" || typeof newVNode === "number") {
      if (oldVNode !== newVNode && targetDom) {
        targetDom.textContent = newVNode;
      }
      return;
    }
  }

  // 새 노드 추가
  if (!oldVNode && newVNode) {
    parent.appendChild(createRealElement(newVNode));
    return;
  }

  // 기존 노드 삭제
  if (oldVNode && !newVNode) {
    if (targetDom) {
      parent.removeChild(targetDom);
    }
    return;
  }

  // 타입 다르면 교체
  if (oldVNode.type !== newVNode.type) {
    if (targetDom) {
      parent.replaceChild(createRealElement(newVNode), targetDom);
    } else {
      parent.appendChild(createRealElement(newVNode));
    }
    return;
  }

  // 타입이 같으면 props 업데이트
  updateProps(targetDom, oldVNode.props, newVNode.props);

  const oldChildren = oldVNode.children || [];
  const newChildren = newVNode.children || [];
  const maxLength = Math.max(oldChildren.length, newChildren.length);

  // 자식 노드 까지 재귀적으로 비교/ 업데이트
  for (let i = 0; i < maxLength; i++) {
    updateElement(targetDom, oldChildren[i], newChildren[i], i);
  }
}

function updateProps(dom, oldProps = {}, newProps = {}) {
  // 새로운 props 적용
  for (const [key, value] of Object.entries(newProps)) {
    if (key === "className") {
      dom.setAttribute("class", value);
    } else if (key.startsWith("on") && typeof value === "function") {
      dom[key.toLowerCase()] = value;
    } else {
      dom.setAttribute(key, value);
    }
  }

  // 삭제된 props 제거
  for (const key in oldProps) {
    if (!(key in newProps)) {
      if (key === "className") {
        dom.removeAttribute("class");
      } else if (key.startsWith("on")) {
        dom[key.toLowerCase()] = null;
      } else {
        dom.removeAttribute(key);
      }
    }
  }
}

export function renderElement(newVNode, container) {
  if (!oldVNode) {
    // 최초 렌더링
    container.appendChild(createRealElement(newVNode));
  } else {
    // 업데이트
    updateElement(container, oldVNode, newVNode);
  }

  // 업데이트 후 가상돔 저장
  oldVNode = newVNode;
}
