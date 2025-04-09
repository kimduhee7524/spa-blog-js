import { posts } from "../mocks/post.json";
import { postDetails } from "../mocks/postDetails.json";

export function getPosts() {
  return posts;
}

export function getPostDetails(Id) {
  return postDetails.find((detail) => detail.id === Id) || null;
}
