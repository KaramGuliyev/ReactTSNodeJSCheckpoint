import React, { useEffect, useState } from "react";

export default function ToDo() {
  const [lists, setLists] = useState([]);
  const [input, setInput] = useState("");
  const [lastId, setLastId] = useState(0);
  const [isLoading, setLoading] = useState(true);

  async function saveById() {
    await fetch("http://localhost:3005/api/planets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ id: lastId, name: input }),
    });
    setInput("");
    setList();

    console.log(lastId);
  }

  async function setList() {
    const response = await fetch(
      "http://localhost:3005/api/planets",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const content = await response.json();
    setLists([...content]);
    setLoading(false);
    setLastId(Number(content[content.length - 1].id) + 1);
  }

  async function updateElement(id) {
    console.log("initated");
    const response = await fetch(
      "http://localhost:3005/api/planets/" + id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, name: input }),
      }
    );
    const content = await response.json();
    setLists([...content.planets]);
    setLoading(false);
  }

  useEffect(() => {
    setList();
  }, []);

  async function deleteElement(id) {
    const response = await fetch(
      "http://localhost:3005/api/planets/" + id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const content = await response.json();
    setLists([...content.planets]);
    setLoading(false);
  }

  return (
    <>
      <h1>ToDo List for Habibi's</h1>
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <button onClick={saveById}>Save</button>

      {isLoading ? (
        <>
          <br /> "Habibi Load Initated!"
        </>
      ) : (
        lists.map((el, i) => {
          return (
            <li key={i}>
              <ul>
                {el.name} : {el.id}
                <button
                  onClick={() => deleteElement(el.id)}
                  style={{ marginLeft: "2rem" }}
                >
                  Detele
                </button>
                <button
                  onClick={() => updateElement(el.id)}
                  style={{ marginLeft: "2rem" }}
                >
                  Update
                </button>
              </ul>
            </li>
          );
        })
      )}
    </>
  );
}
