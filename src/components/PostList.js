import { PostCard } from "./PostCard.js";

export function PostList(posts) {
  return posts.map((post) => PostCard(post)).join("");
}
