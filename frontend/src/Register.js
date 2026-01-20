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
    <div className="container">
      <h2>Register</h2>

      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

      <button onClick={register}>Create Account</button>
      <button className="secondary" onClick={() => setPage("login")}>
        Back to Login
      </button>
    </div>
  );
}

export default Register;
