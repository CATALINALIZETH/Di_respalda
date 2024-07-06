
import './App.css';
import { useState } from "react";
import axios from "axios";


function App() {

  //shit+alt+flechaabajo  copia y pega tu elemento
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  function add() {

    axios.post("http://localhost:3001/create", {
      nombre: nombre, //la variable que la representa es nombre esta en el const
      correo: correo,
      contrasena: contrasena
    }).then(() => {
      alert("El usuario esta registrado");
    }) //despues de enviar los datos hara la alerta
      .catch(error => {
        console.error('Hubo un error!', error);
      });
  }

  return (
    <div className="App">
      <div className="datos">
        <label>Nombre: <input 
        onChange={(event)=>{
          setNombre(event.target.value); //extrae la infor del componente
        }}
        type="text"></input></label>
        <label>Correo: <input 
        onChange={(event)=>{
          setCorreo(event.target.value); //extrae la infor del componente
        }}
        type="text"></input></label>
        <label>Contraseña: <input
        onChange={(event)=>{
          setContrasena(event.target.value); //extrae la infor del componente
        }}
         type="password"></input></label>
        <button onClick={add}>Registrar</button>
      </div>
    </div>
  );
}

export default App;


//ctrl c para salirte