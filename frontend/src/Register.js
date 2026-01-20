import { useState } from "react";

function Register({ setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    setPage("login");
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
      <button onClick={() => setPage("login")}>Back</button>
    </div>
  );
}

export default Register;
