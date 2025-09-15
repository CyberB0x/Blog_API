import { useState } from "react";
import API from "../api";

export default function PostForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("posts/", {
        title,
        body,
        is_published: isPublished,
      });
      // res.data — созданный пост
      setTitle("");
      setBody("");
      if (onCreated) onCreated(res.data);
      alert("Пост создан");
    } catch (err) {
      console.error(err);
      // показываем понятное сообщение
      const msg = err.response?.data || err.message || "Ошибка";
      alert("Ошибка при создании поста: " + JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow mb-4">
      <h3 className="text-lg font-semibold mb-2">Create Post</h3>
      <input
        className="block w-full p-2 border rounded mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="block w-full p-2 border rounded mb-2"
        placeholder="Body"
        rows="6"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <label className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
        />
        <span>is_published</span>
      </label>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}
