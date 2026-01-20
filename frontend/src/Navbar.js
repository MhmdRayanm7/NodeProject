import { useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  // logout user
  const logout = () => {
    fetch("/auth/logout", {
      method: "POST",
      credentials: "include"
    }).then(() => {
      setUser(null);
      navigate("/login");
    });
  };

  return (
    <nav>
      <button onClick={() => navigate("/")}>Home</button>

      {user && <button onClick={() => navigate("/levels")}>Levels</button>}

      {!user && <button onClick={() => navigate("/login")}>Login</button>}
      {!user && <button onClick={() => navigate("/register")}>Register</button>}

      {user && <button onClick={logout}>Logout</button>}
    </nav>
  );
}

export default Navbar;
