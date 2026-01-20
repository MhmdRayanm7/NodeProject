import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Levels from "./Levels";
import Navbar from "./Navbar";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // check session
  useEffect(() => {
    fetch("/auth/me", {
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) {
          setUser(null);
        } else {
          return res.json();
        }
      })
      .then(data => {
        if (data) setUser(data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/levels" element={<Levels user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
