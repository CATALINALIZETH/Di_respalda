import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");

    const add = () => {
        axios.post("http://localhost:3001/create", {
            nombre: nombre,
            correo: correo,
            contrasena: contrasena
        }).then(() => {
            alert("El usuario está registrado");
        }).catch(error => {
            console.error('Hubo un error!', error);
            alert('Hubo un error al registrar el usuario.');
        });
    }

    return (
        <div className="container">
            <br></br>
            <div className="card text-center">
                <div className="card-header">
                    Registrar Usuario
                </div>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <span className="input-group-text">Nombre:</span>
                        <input type="text" onChange={(event) => setNombre(event.target.value)} className="form-control" placeholder="Escribe nombre" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Correo:</span>
                        <input type="text" onChange={(event) => setCorreo(event.target.value)} className="form-control" placeholder="Escribe correo" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Contraseña:</span>
                        <input type="password" onChange={(event) => setContrasena(event.target.value)} className="form-control" placeholder="Escribe contraseña" />
                    </div>
                    <button className="btn btn-success" onClick={add}>Registrar</button>
                </div>
            </div>
        </div>
    );
}

export default Register;
