import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login() {
    const [correoLogin, setCorreoLogin] = useState("");
    const [contrasenaLogin, setContrasenaLogin] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const navigate = useNavigate();

    const login = () => {
        if (!correoLogin || !contrasenaLogin) {
            Swal.fire({
                title: "Error",
                text: "Todos los campos son obligatorios",
                icon: "error",
                timer: 3500
            });
            return;
        }

        axios.post("http://localhost:3001/login", {
            correo: correoLogin,
            contrasena: contrasenaLogin
        }).then((response) => {
            if (response.data.auth) {
                localStorage.setItem('token', response.data.token);
                setLoginStatus("Login exitoso");
                navigate('/libros', { state: { name: response.data.name } });
            } else {
                Swal.fire({
                    title: "Error",
                    text: response.data.message,
                    icon: "error",
                    timer: 3500
                });
            }
        }).catch(error => {
            console.error('Hubo un error!', error);
            Swal.fire({
                title: "Error",
                text: "Hubo un error al iniciar sesión.",
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
                    Iniciar Sesión
                </div>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <span className="input-group-text">Correo:</span>
                        <input type="text" onChange={(event) => setCorreoLogin(event.target.value)} className="form-control" placeholder="Escribe correo" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Contraseña:</span>
                        <input type="password" onChange={(event) => setContrasenaLogin(event.target.value)} className="form-control" placeholder="Escribe contraseña" />
                    </div>
                    <button className="btn btn-primary" onClick={login}>Iniciar Sesión</button>
                    <br></br>
                    <h3>{loginStatus}</h3>
                </div>
            </div>
        </div>
    );
}

export default Login;
