function Navbar({ onLogout }) {
  const logout = async () => {
    await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include"
    });
    onLogout();
  };

  return (
    <div className="navbar">
      <h3>Light of Vision</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;
