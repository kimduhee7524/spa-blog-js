export function CommentLikePanel() {
  const [commentCount, setCommentCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);

  window.addComment = () => setCommentCount(commentCount + 1);
  window.addLike = () => setLikeCount(likeCount + 1);

  return `
      <div>
        <div class="flex justify-center gap-28 text-sm">
          <p>💬 댓글 개수: <strong>${commentCount}</strong></p>
          <p>❤️ 좋아요 개수: <strong>${likeCount}</strong></p>
        </div>
        <div class="flex space-x-2 mt-4">
          <button onclick="addComment()" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-lg">
            댓글추가
          </button>
          <button onclick="addLike()" class="flex-1 bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium py-2 px-3 rounded-lg">
            좋아요
          </button>
        </div>
      </div>
    `;
}
