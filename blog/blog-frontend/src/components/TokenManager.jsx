import { useState, useEffect } from "react";

export default function TokenManager({ onChange }) {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("access") || "");
  }, []);

  function saveToken() {
    if (!token) return alert("Введите токен");
    localStorage.setItem("access", token);
    if (onChange) onChange();
    alert("Access token сохранён");
  }

  function clearToken() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setToken("");
    if (onChange) onChange();
    alert("Токен удалён");
  }

  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h3 className="text-lg font-semibold mb-2">Token Manager</h3>
      <textarea
        rows="3"
        className="block w-full p-2 border rounded mb-2"
        placeholder="Вставь сюда access токен (если получал через Postman/shell)"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <div className="flex gap-2">
        <button onClick={saveToken} className="px-3 py-1 bg-green-600 text-white rounded">
          Save token
        </button>
        <button onClick={clearToken} className="px-3 py-1 bg-red-600 text-white rounded">
          Clear token
        </button>
      </div>
    </div>
  );
}
