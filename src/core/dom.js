export function createVirtualElement(type, props, ...children) {
  return {
    type,
    props: props || {},
    children: children.flat(),
  };
}

export function createRealElement(vnode) {
  if (typeof vnode === "string" || typeof vnode === "number") {
    return document.createTextNode(vnode);
  }

  if (typeof vnode.type === "function") {
    const componentVNode = vnode.type(vnode.props || {});
    return createRealElement(componentVNode);
  }

  const el = document.createElement(vnode.type);

  for (const [key, value] of Object.entries(vnode.props || {})) {
    if (key === "className") {
      el.setAttribute("class", value);
    } else if (key.startsWith("on") && typeof value === "function") {
      el.addEventListener(key.slice(2).toLowerCase(), value); // ✅ onClick 등 이벤트 처리
    } else {
      el.setAttribute(key, value);
    }
  }

  (vnode.children || []).forEach((child) => {
    el.appendChild(createRealElement(child));
  });

  return el;
}

export function render(vnode, container) {
  container.innerHTML = "";
  const el = createRealElement(vnode);
  container.appendChild(el);
}
