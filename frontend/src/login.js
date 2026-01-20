import { useState } from "react";

function Login({ setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      setPage("levels");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

      <button onClick={login}>Login</button>
      <button className="secondary" onClick={() => setPage("register")}>
        Register
      </button>
    </div>
  );
}

export default Login;
