import { useState } from "../useState.js";

export function PostComments({ id, commentId }) {
  const [commentCount, setCommentCount] = useState(0);

  window.addComment = () => {
    setCommentCount(commentCount() + 1);
    console.log(commentCount());
  };

  return `
    <div class="container mx-auto p-4">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
        <h2 class="text-2xl font-bold mb-4">Post ${id} - Comment ${commentId}</h2>
        <p class="text-gray-800 mb-2">댓글입니다!</p>
        <p id="commentCount" class="text-gray-600 mb-4">댓글 개수: ${commentCount()}</p>
        <button onclick="addComment()" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          댓글추가
        </button>
      </div>
    </div>
  `;
}
