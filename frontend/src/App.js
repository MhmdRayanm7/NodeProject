import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Levels from "./Levels";
import Navbar from "./Navbar";

function App() {
  const [page, setPage] = useState("login");

  return (
    <>
      {page === "levels" && (
        <Navbar onLogout={() => setPage("login")} />
      )}

      {page === "login" && <Login setPage={setPage} />}
      {page === "register" && <Register setPage={setPage} />}
      {page === "levels" && <Levels />}
    </>
  );
}

export default App;
