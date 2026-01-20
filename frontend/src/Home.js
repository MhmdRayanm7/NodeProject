import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/auth/me", {
      credentials: "include"
    })
      .then(res => {
        if (res.status === 401) {
          navigate("/login");
          return;
        }
        return res.json();
      })
      .then(data => {
        if (data?.user) {
          setUser(data.user);
        }
      });
  }, [navigate]);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome {user.username}</p>
    </div>
  );
}

export default Home;
