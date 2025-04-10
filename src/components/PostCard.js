export function PostCard(post) {
  return `
    <div class="bg-white rounded-lg shadow p-4 cursor-pointer" 
      data-route="/post/${post.id}">
      <div class="flex items-center mb-2">
        <div>
          <p class="font-bold">${post.title}</p>
          <p class="text-sm text-gray-500">${post.date}</p>
        </div>
      </div>
      <p>${post.summary}</p>
      <div class="flex items-center mt-2 text-sm text-gray-500">
        <span>작성자: ${post.author}</span>
      </div>
    </div>
  `;
}
