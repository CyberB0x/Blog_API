import { useEffect, useState } from "react";
import API from "../api";

function MyPosts({ token }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await API.get("my-posts/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data);
      } catch (err) {
        console.error(err);
        alert("Ошибка загрузки ваших постов");
      }
    };

    if (token) {
      fetchMyPosts();
    }
  }, [token]);

  if (!token) {
    return <p className="text-red-500">Пожалуйста, войдите, чтобы видеть свои посты.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Мои посты</h1>
      {posts.length === 0 ? (
        <p>У вас пока нет постов.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="p-4 border rounded shadow">
              <h2 className="font-bold text-lg">{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyPosts;
