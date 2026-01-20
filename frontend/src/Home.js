function Home({ user }) {
  if (!user) {
    return <h2>Welcome, please login</h2>;
  }

  return (
    <div>
      <h2>Welcome {user.username}</h2>
      <p>You are logged in</p>
    </div>
  );
}

export default Home;
