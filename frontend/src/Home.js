function Home({ user, setPage }) {
  return (
    <div className="container">
      <h2>Welcome</h2>

      <p>
        Hello <strong>{user?.username}</strong>, welcome to Light of Vision.
      </p>

      <button onClick={() => setPage("levels")}>
        Go to Levels
      </button>
    </div>
  );
}

export default Home;
