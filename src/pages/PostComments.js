export function PostComments({ id, commentId }) {
  return `
      <div class="p-4">
        <h2 class="text-2xl font-bold">Post ${id} - Comment ${commentId}</h2>
        <p>댓글입니다!</p>
        <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded" data-route="/post/${id}">
          게시글로 돌아가기
        </button>
      </div>
    `;
}
