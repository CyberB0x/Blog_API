import { useState } from "react";
import API from "../api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("token/", { username, password }); // путь только "token/"
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      setMessage("✅ Успешный вход!");
    } catch (err) {
      setMessage("❌ Ошибка входа: " + err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">🔑 Войти</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Войти
        </button>
      </form>
      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
}

export default Login;
