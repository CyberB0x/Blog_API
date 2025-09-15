import { useEffect, useState } from "react";
import API from "./api";

import Login from "./components/Login";
import TokenManager from "./components/TokenManager";
import PostForm from "./components/PostForm";

function App() {
  const [posts, setPosts] = useState([]);
  const [hasToken, setHasToken] = useState(Boolean(localStorage.getItem("access")));

  useEffect(() => {
    loadPosts();
  }, []);

  function loadPosts() {
    API.get("posts/")
      .then((res) => setPosts(res.data))
      .catch((err) => {
        console.error(err);
        setPosts([]);
      });
  }

  function onCreated(newPost) {
    // добавляем созданный пост в список сверху
    setPosts((prev) => [newPost, ...prev]);
  }

  function onAuthChange() {
    setHasToken(Boolean(localStorage.getItem("access")));
    // можно перезагрузить список с правами (если нужно)
    loadPosts();
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">📚 Blog Posts</h1>

      {/* Аутентификация / менеджер токена */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Login onLogin={onAuthChange} />
        <TokenManager onChange={onAuthChange} />
      </div>

      {/* Форма создания — видна, только если есть токен */}
      {hasToken ? (
        <PostForm onCreated={onCreated} />
      ) : (
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 mb-4">
          <strong>Внимание:</strong> чтобы создать пост — войди (Login) или вставь access токен в Token Manager.
        </div>
      )}

      {/* Список постов */}
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.body?.slice(0, 200)}{post.body?.length > 200 ? "..." : ""}</p>
            <div className="text-sm text-gray-500 mt-2">
              Author: {post.author} • Published: {String(post.is_published)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
