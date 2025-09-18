import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import PostForm from "./components/PostForm";

function App() {
  return (
    <Router>
      <nav className="flex gap-4 p-4 bg-gray-100 shadow">
        <Link to="/" className="text-blue-600 font-bold">🏠 Home</Link>
        <Link to="/create" className="text-green-600 font-bold">➕ Create Post</Link>
        <Link to="/login" className="text-purple-600 font-bold">🔑 Login</Link>
      </nav>

      <div className="p-6">
        <Routes>
          <Route path="/" element={<h1 className="text-2xl">Welcome to Blog API</h1>} />
          <Route path="/create" element={<PostForm />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
