/** @jsx createVirtualElement */
import { createVirtualElement } from "../core/createVirtualElement.js";

export function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 sticky top-0" data-route="/">
      <h1 className="text-lg font-bold cursor-pointer">Tech Blog</h1>
    </header>
  );
}
