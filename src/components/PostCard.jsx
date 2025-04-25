/** @jsx createVirtualElement */
import { createVirtualElement } from "../core/createVirtualElement.js";

export function PostCard({ post }) {
  return (
    <div
      className="bg-white rounded-lg shadow p-4 cursor-pointer"
      data-route={`/post/${post.id}`}
    >
      <div className="flex items-center mb-2">
        <div>
          <p className="font-bold">{post.title}</p>
          <p className="text-sm text-gray-500">{post.date}</p>
        </div>
      </div>
      <p>{post.summary}</p>
      <div className="flex items-center mt-2 text-sm text-gray-500">
        <span>작성자: {post.author}</span>
      </div>
    </div>
  );
}
