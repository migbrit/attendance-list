import React, { useEffect } from "react";
import "./styles.css";
import { Card } from "../../components/Card";

export function Home() {
  const [studentName, setStudentName] = React.useState();
  const [students, setStudents] = React.useState([]);
  const [user, setUser] = React.useState({name: "", avatar: ""});

  function handleAddStudent() {
    const student = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };
    setStudents((prevstate) => [...prevstate, student]);
  }

  useEffect(() => 
  {
    fetch("https://api.github.com/users/migbrit")
    .then(response => response.json())
    .then(data => setUser({name: data.name, avatar: data.avatar_url}))
  }, []);

  return (
    <div className="container">
      <header>
      <h1>Lista de Presença</h1>
      <div>
      <strong>{user.name}</strong>
      <img src={user.avatar} alt="Foto de perfil" />
      </div>
      </header>
      
      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={(e) => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {students.map((student) => (<Card key={student.time} name={student.name} time={student.time} />))}
    </div>
  );
}
