import { useEffect, useState } from "react";

export default function History() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/interactions")
      .then(res => res.json())
      .then(setList);
  }, []);

  return (
    <>
      <h2>Interaction History</h2>
      {list.map(i => (
        <div key={i.id}>
          <b>{i.hcp_name}</b> – {i.interaction_type}
        </div>
      ))}
    </>
  );
}
