import { useState } from "react";
import API from "../api";

function PostForm({ token, fetchPosts }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(
        "posts/",
        { title, body },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setBody("");
      fetchPosts(); // обновляем список постов
    } catch (err) {
      console.error(err);
      alert("Ошибка при создании поста");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Создать пост
      </button>
    </form>
  );
}

export default PostForm;
