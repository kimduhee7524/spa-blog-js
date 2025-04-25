/** @jsx createVirtualElement */
import { createVirtualElement } from "./core/dom.js";

import { Header } from "./components/Header.jsx";

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <main
        id="content"
        className="bg-gray-100 min-h-screen flex justify-center"
      ></main>
    </div>
  );
}
