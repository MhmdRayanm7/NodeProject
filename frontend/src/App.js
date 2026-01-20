import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Levels from "./Levels";

function App() {
  const [page, setPage] = useState("login");

  return (
    <div>
      {page === "login" && <Login setPage={setPage} />}
      {page === "register" && <Register setPage={setPage} />}
      {page === "levels" && <Levels />}
    </div>
  );
}

export default App;
