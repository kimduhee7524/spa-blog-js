/** @jsx createVirtualElement */
import { createVirtualElement } from "../core/dom.js";
import { getPostDetails } from "../services/postService.js";
import { router } from "../router.js"; 

export function PostDetail({ id }) {
  const postDetail = getPostDetails(parseInt(id));

  const handleBackClick = () => {
    router.navigateTo("/");
  };

  const handleCommentsClick = () => {
    router.navigateTo(`/post/${id}/comments/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
        
        <button
          className="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleBackClick}
        >
          뒤로가기
        </button>

        <h1 className="text-3xl font-bold mb-2">{postDetail.title}</h1>

        <div className="items-center mb-6 text-gray-600 text-sm">
          <div className="mr-4">{postDetail.author}</div>
          <div>작성일: {postDetail.date}</div>
        </div>

        <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: postDetail.content }} />

        <div className="text-right">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
            onClick={handleCommentsClick}
          >
            댓글 보기
          </button>
        </div>
        
      </div>
    </div>
  );
}
