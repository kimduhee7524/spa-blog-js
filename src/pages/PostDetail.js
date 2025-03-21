export function PostDetail(id) {
  return `
      <div class="max-w-md w-full">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
          <h1 class="text-3xl font-bold mb-2">PostDetail 페이지</h1>
          <h3 class="text-3xl font-bold mb-2">Post ID: ${id}</h3>
        </div>
      </div>
    `;
}
