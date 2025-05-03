/** @jsx createVirtualElement */
import { createVirtualElement } from "../core/dom.js";

import { PostList } from "../components/PostList.jsx";
import { posts } from "../mocks/post.json";

export function Home() {
  return (
    <div className="max-w-md w-full">
      <div className="p-4">
        <div className="space-y-4">
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
}
