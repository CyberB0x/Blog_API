import { useState } from "react";

function TokenManager() {
  const [token, setToken] = useState(localStorage.getItem("access") || null);

  const saveToken = (newToken) => {
    localStorage.setItem("access", newToken);
    setToken(newToken);
  };

  const clearToken = () => {
    localStorage.removeItem("access");
    setToken(null);
  };

  return { token, saveToken, clearToken };
}

export default TokenManager;
