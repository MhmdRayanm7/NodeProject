function Navbar({ onLogout }) {
  return (
    <div className="navbar">
      <h3>Light of Vision</h3>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Navbar;
