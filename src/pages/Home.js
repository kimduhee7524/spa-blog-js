import { PostList } from "../components/PostList.js";
import { posts } from "../mocks/post.json";

export function Home() {
  const postsHTML = PostList(posts);
  return `
    <main class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        <div class="p-4">
            <div class="space-y-4">
              ${postsHTML}
            </div>
        </div>
      </div>
    </main>
  `;
}
