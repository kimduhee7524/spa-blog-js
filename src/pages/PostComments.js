import { useState } from "../useState.js";

export function PostComments({ id, commentId }) {
  const [commentCount, setCommentCount] = useState(0);
  const [LikeCount, setLikeCount] = useState(0);

  window.addComment = () => {
    setCommentCount(commentCount + 1);
    console.log(commentCount);
  };
  window.addLike = () => {
    setLikeCount(LikeCount + 1);
    console.log(LikeCount);
  };

  return `
    <div class="container mx-auto p-4">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
        <h2 class="text-2xl font-bold mb-4">Post ${id} - Comment ${commentId}</h2>
        <div class="flex justify-center gap-28 text-sm ">
          <p id="commentCount">💬 댓글 개수: <strong>${commentCount}</strong></p>
          <p id="likeCount">❤️ 좋아요 개수: <strong>${LikeCount}</strong></p>
        </div>
        <div class="flex space-x-2 mt-4">
          <button 
            onclick="addComment()" 
            class="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-lg">
            댓글추가
          </button>
          <button 
            onclick="addLike()" 
            class="flex-1 bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium py-2 px-3 rounded-lg">
            좋아요
          </button>
        </div>
      </div>
    </div>
  `;
}
