import { getPostDetails } from "../services/postService.js";

export function PostDetail(Id) {
  console.log("id", Id);
  const postDetail = getPostDetails(parseInt(Id));

  return `
    <div class="container mx-auto p-4">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
        <button class="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" 
                onclick="window.router.navigateTo('/')">뒤로가기</button>

        <h1 class="text-3xl font-bold mb-2">${postDetail.title}</h1>

        <div class="items-center mb-6 text-gray-600 text-sm">
          <div class="mr-4">${postDetail.author}</div>
          <div>작성일: ${postDetail.date}</div>
        </div>

        <div class="prose max-w-none">
          ${postDetail.content}
        </div>
      </div>
    </div>
  `;
}
