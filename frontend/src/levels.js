import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Levels({ user }) {
  const navigate = useNavigate();

  // protect page
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return <h2>Levels Page (Protected)</h2>;
}

export default Levels;
