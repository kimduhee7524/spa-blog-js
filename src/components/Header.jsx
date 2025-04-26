/** @jsx createVirtualElement */
import { createVirtualElement } from "../core/dom.js";
import { router } from "../router.js"; 

export function Header() {
  const handleClick = () => {
    router.navigateTo("/");
  };

  return (
    <header className="bg-blue-600 text-white p-4 sticky top-0 cursor-pointer" onClick={handleClick}>
      <h1 className="text-lg font-bold">Tech Blog</h1>
    </header>
  );
}
