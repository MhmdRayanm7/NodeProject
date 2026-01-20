import { useState } from "react";

function Register({ setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      alert("Registration successful");
      setPage("login");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div>
      <input
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <button type="button" onClick={register}>
        Register
      </button>
    </div>
  );
}

export default Register;
