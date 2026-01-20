import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Levels from "./Levels";
import Navbar from "./Navbar";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  return (
    <>
      {(page === "home" || page === "levels") && (
        <Navbar
          onLogout={() => {
            setUser(null);
            setPage("login");
          }}
        />
      )}

      {page === "login" && (
        <Login setPage={setPage} setUser={setUser} />
      )}

      {page === "register" && <Register setPage={setPage} />}

      {page === "home" && <Home user={user} setPage={setPage} />}

      {page === "levels" && <Levels />}
    </>
  );
}

export default App;
