import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import PostForm from "./components/PostForm";
import MyPosts from "./components/MyPosts";
import Home from "./components/Home";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);

  // заглушка для обновления постов (если надо будет)
  const fetchPosts = () => {};

  return (
    <Router>
      <nav className="flex gap-4 p-4 bg-gray-100 shadow">
        <Link to="/" className="text-blue-600 font-bold">
          🏠 Home
        </Link>
        <Link to="/create" className="text-green-600 font-bold">
          ➕ Create Post
        </Link>
        <Link to="/my-posts" className="text-orange-600 font-bold">
          📚 My Posts
        </Link>
        <Link to="/login" className="text-purple-600 font-bold">
          🔑 Login
        </Link>
      </nav>

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/create"
            element={<PostForm token={token} fetchPosts={fetchPosts} />}
          />
          <Route path="/my-posts" element={<MyPosts token={token} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
