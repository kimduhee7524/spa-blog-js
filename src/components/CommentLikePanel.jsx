/** @jsx createVirtualElement */
import { createVirtualElement } from "../core/dom.js";
import { reactSystem } from "../core/reactSystem.js";

export function CommentLikePanel() {
  const { useState, useEffect } = reactSystem;
  const [commentCount, setCommentCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);

  const addComment = () => setCommentCount(commentCount + 1);
  const addLike = () => setLikeCount(likeCount + 1);

  useEffect(() => {
    console.log("useEffect 실행");
  }, [commentCount]);

  return (
    <div>
      <div class="flex justify-center gap-28 text-sm">
        <p>💬 댓글 개수: <strong>{commentCount}</strong></p>
        <p>❤️ 좋아요 개수: <strong>{likeCount}</strong></p>
      </div>
      <div class="flex space-x-2 mt-4">
        <button onClick={addComment} class="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-lg">
          댓글 추가
        </button>
        <button onClick={addLike} class="flex-1 bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium py-2 px-3 rounded-lg">
          좋아요
        </button>
      </div>
    </div>
  );
}
