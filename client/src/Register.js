import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Register() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const navigate = useNavigate();

    const add = () => {
        if (!nombre || !correo || !contrasena) {
            Swal.fire({
                title: "Error",
                text: "Todos los campos son obligatorios",
                icon: "error",
                timer: 3500
            });
            return;
        }

        axios.post("http://localhost:3001/create", {
            nombre: nombre,
            correo: correo,
            contrasena: contrasena
        }).then(() => {
            Swal.fire({
                title: "El usuario está registrado :)",
                html: "<i>Usuario " + nombre + " está registrado</i>",
                icon: "success",
                timer: 3500 //para que visualmente se quede 2.5 seg
            }).then(() => {
                navigate('/'); // Redirigir a Home
            });
        }).catch(error => {
            console.error('Hubo un error!', error);
            Swal.fire({
                title: "Error",
                text: "Hubo un error al registrar el usuario.",
                icon: "error",
                timer: 3500
            });
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
                        <input type="email" onChange={(event) => setCorreo(event.target.value)} className="form-control" placeholder="Escribe correo" />
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
