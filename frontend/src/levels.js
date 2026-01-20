import { useEffect, useState } from "react";

function Levels() {
  const [levels, setLevels] = useState([]);
  const [name, setName] = useState("");

  const loadLevels = async () => {
    const res = await fetch("http://localhost:3000/levels", {
      credentials: "include"
    });
    const data = await res.json();
    setLevels(data);
  };

  useEffect(() => {
    loadLevels();
  }, []);

  const addLevel = async () => {
    await fetch("http://localhost:3000/levels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        level_name: name,
        difficulty: 1,
        description: "Created from UI"
      })
    });
    setName("");
    loadLevels();
  };

  return (
    <div className="container">
      <h2>Game Levels</h2>

      <input
        placeholder="New level name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={addLevel}>Add Level</button>

      <ul>
        {levels.map(l => (
          <li key={l.id}>{l.level_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Levels;
