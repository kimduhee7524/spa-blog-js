export function header() {
  return `
      <header class="bg-blue-600 text-white p-4 sticky top-0" 
        onclick="router.navigateTo('/')">
          <h1 class="text-lg font-bold  cursor-pointer"> Tech Blog </h1>
      </header>
      `;
}
