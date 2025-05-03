/** @jsx createVirtualElement */
import { createVirtualElement } from "../core/dom.js";
import { router } from "../router.js";  

export function PostCard({ post }) {
  const handleClick = () => {
    router.navigateTo(`/post/${post.id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow p-4 cursor-pointer"
      onClick={handleClick} 
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
