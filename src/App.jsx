/** @jsx createVirtualElement */
import { createVirtualElement } from "./core/dom.js";
import { router } from "./router.js";
import { Header } from "./components/Header.jsx";

export default function App() {
  const CurrentPage = router.getCurrentComponent();

  return (
    <div>
      <Header />
      <main id="content" class="p-4">
        {CurrentPage ? <CurrentPage /> : <div>404 Not Found</div>}
      </main>
    </div>
  );
}
