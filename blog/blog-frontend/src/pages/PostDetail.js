import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`posts/${id}/`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = () => {
    API.delete(`posts/${id}/`)
      .then(() => {
        alert("🗑️ Пост удалён");
        navigate("/");
      })
      .catch(() => alert("Ошибка при удалении"));
  };

  if (!post) return <p>Загрузка...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-4">{post.body}</p>

      <div className="flex space-x-2">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Удалить
        </button>
        {/* Редактирование можно добавить сюда */}
      </div>
    </div>
  );
}

export default PostDetail;
