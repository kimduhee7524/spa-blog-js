import { getPostDetails } from "../services/postService.js";

export function PostDetail({ id }) {
  console.log("id", id);
  const postDetail = getPostDetails(parseInt(id));
  console.log("postDetail", postDetail);

  return `
    <div class="container mx-auto p-4">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
        <button class="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" data-route="/">뒤로가기</button>

        <h1 class="text-3xl font-bold mb-2">${postDetail.title}</h1>

        <div class="items-center mb-6 text-gray-600 text-sm">
          <div class="mr-4">${postDetail.author}</div>
          <div>작성일: ${postDetail.date}</div>
        </div>

        <div class="prose max-w-none mb-6">
          ${postDetail.content}
        </div>

        <div class="text-right">
          <button 
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
            data-route="/post/${id}/comments/${id}"
          >
            댓글 보기
          </button>
        </div>
      </div>
    </div>
  `;
}
