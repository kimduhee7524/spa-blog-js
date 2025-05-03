/** @jsx createVirtualElement */
import { createVirtualElement } from "../core/dom.js";
import { CommentLikePanel } from "../components/CommentLikePanel.jsx";

export function PostComments({ id, commentId }) {
  return (
    <div class="container mx-auto p-4">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
        <h2 class="text-2xl font-bold mb-4">
          Post {id} - Comment {commentId}
        </h2>
        <CommentLikePanel />
      </div>
    </div>
  );
}
