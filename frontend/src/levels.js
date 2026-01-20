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
        description: "from react"
      })
    });
    loadLevels();
  };

  return (
    <div>
      <h2>Levels</h2>
      <input placeholder="level name" onChange={e => setName(e.target.value)} />
      <button onClick={addLevel}>Add</button>

      <ul>
        {levels.map(l => (
          <li key={l.id}>{l.level_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Levels;
