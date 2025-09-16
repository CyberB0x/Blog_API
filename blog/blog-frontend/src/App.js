import { useState } from "react";
import Login from "./components/Login";
import PostForm from "./components/PostForm";
import API from "./api";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [posts, setPosts] = useState([]);

  // Загружаем посты
  const fetchPosts = () => {
    API.get("posts/", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6">
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <h1 className="text-3xl font-bold text-blue-600 mb-4">📚 Blog</h1>

          {/* форма добавления поста */}
          <PostForm token={token} fetchPosts={fetchPosts} />

          {/* список постов */}
          <ul className="space-y-2 mt-4">
            {posts.map((post) => (
              <li key={post.id} className="p-4 bg-white rounded shadow">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-600">{post.body}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
