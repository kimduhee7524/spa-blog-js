export function NotFound() {
  return `
      <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p class="text-xl text-gray-600 mb-6">페이지를 찾을 수 없습니다</p>
          <button class="bg-blue-600 text-white px-4 py-2 rounded home-btn">
            홈으로 이동
          </button>
        </div>
      </div>
    `;
}
