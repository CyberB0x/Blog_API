import { useEffect, useState } from "react";
import API from "./api";
import Login from "./components/Login";
import PostForm from "./components/PostForm";
import TokenManager from "./components/TokenManager";

function App() {
  const [posts, setPosts] = useState([]);
  const { token, saveToken, clearToken } = TokenManager();

  const fetchPosts = async () => {
    try {
      const res = await API.get("posts/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (err) {
      console.error("Ошибка загрузки постов", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">📚 Blog API</h1>

      {!token ? (
        <Login saveToken={saveToken} />
      ) : (
        <>
          <button
            onClick={clearToken}
            className="mb-4 px-3 py-1 bg-red-600 text-white rounded"
          >
            Выйти
          </button>

          <PostForm token={token} fetchPosts={fetchPosts} />

          <ul className="space-y-2 mt-4">
            {posts.map((post) => (
              <li key={post.id} className="p-4 bg-white rounded shadow">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-600">{post.body.substring(0, 100)}...</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
