import { PostList } from "../components/PostList.js";
import { posts } from "../mocks/post.json";

export function Home() {
  const postsHTML = PostList(posts);
  return `
      <div class="max-w-md w-full">
        <div class="p-4">
            <div class="space-y-4">
              ${postsHTML}
            </div>
        </div>
      </div>
  `;
}
