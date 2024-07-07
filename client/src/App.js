
import './App.css';
import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  //shit+alt+flechaabajo  copia y pega tu elemento
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const [correoLogin, setCorreoLogin] = useState("");
  const [contrasenaLogin, setContrasenaLogin] = useState("");
  const [loginStatus, setLoginStatus] = useState(""); //para saber si esta dentro o tiene incorrecto datos

  //lista usuarios
  const [usuariosList, setUsuarios] = useState([]);

  const add = () => {

    axios.post("http://localhost:3001/create", {
      nombre: nombre, //la variable que la representa es nombre esta en el const
      correo: correo,
      contrasena: contrasena
    }).then(() => {
      //getusuarios();
      alert("El usuario esta registrado");
    }).catch(error => {
      // Se ejecuta cuando hay un error en la solicitud
      console.error('Hubo un error!', error);
      alert('Hubo un error al registrar el usuario.');
    });
  }

  const getusuarios = () => {
    axios.get("http://localhost:3001/usuarios").then((response) => {
      setUsuarios(response.data);
    });
  }

  //getusuarios();

  const login = () => {
    axios.post("http://localhost:3001/login", {
      correo: correoLogin,
      contrasena: contrasenaLogin
    }).then((response) => {
      if (response.data.auth) {
        setLoginStatus("Estas Dentro :)");
      } else {
        setLoginStatus(response.data.message);
      }
    });
  }

  return (
    <div class="container">
      <br></br>
      <div className="App">
        <div className='lista'>
          {//map recorre toda la lista
            usuariosList.map((val, key) => {
              return <div className=''>{val.nombre}</div>
            })
          }
        </div>
      </div>
      <div class="card text-center">
        <div class="card-header">
          Usuarios de Libreria
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text"
              onChange={(event) => {
                setNombre(event.target.value); //extrae la infor del componente
              }}
              className="form-control" placeholder="Escribe nombre" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Correo:</span>
            <input type="text"
              onChange={(event) => {
                setCorreo(event.target.value); //extrae la infor del componente
              }}
              className="form-control" placeholder="Escribe correo" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Contraseña:</span>
            <input type="password"
            onChange={(event) => {
              setContrasena(event.target.value); //extrae la infor del componente
            }}
              className="form-control" placeholder="Escribe contraseña" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
        </div>
        <div class="card-footer text-body-secondary">
          <button className='btn btn-success' onClick={add}>Registrar</button>
        </div>
      </div>
      <br></br>
{/* sesion inicia */}
      <div className="card text-center">
        <div className="card-header">
          Iniciar Sesión
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Correo:</span>
            <input type="text"
              onChange={(event) => {
                setCorreoLogin(event.target.value);
              }}
              className="form-control" placeholder="Escribe correo" aria-label="Correo" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Contraseña:</span>
            <input type="password"
              onChange={(event) => {
                setContrasenaLogin(event.target.value);
              }}
              className="form-control" placeholder="Escribe contraseña" aria-label="Contraseña" aria-describedby="basic-addon1" />
          </div>
          <button className="btn btn-primary" onClick={login}>Iniciar Sesión</button>
          <h3>{loginStatus}</h3>
        </div>
      </div>

    </div> //dic container
  );
}

export default App;


//ctrl c para salirte