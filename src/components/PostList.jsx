/** @jsx createVirtualElement */
import { createVirtualElement } from "../core/createVirtualElement.js";

import { PostCard } from "./PostCard.jsx";

export function PostList({ posts }) {
  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ul>
  );
}
