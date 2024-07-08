import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import booksIcon from './imagen/usuarios.png';

import Swal from 'sweetalert2';

function UsersCrud() {

    useEffect(() => {
        getusuarios();
    }, []);

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [id, setId] = useState(0);

    const [usuariosList, setUsuarios] = useState([]);
    const [editar, setEditar] = useState(false);

    //para añadir usuario
    const add = () => {
        axios.post("http://localhost:3001/create", {
            nombre: nombre,
            correo: correo,
            contrasena: contrasena
        }).then(() => {
            getusuarios(); //para mostrar automaticamente al registrar
            limpiar();//limpia campos automaticamente al registrar
            Swal.fire({
                title: "El usuario está registrado :)",
                html: "<i>Usuario " + nombre + " esta registrado</i>",
                icon: "success",
                timer: 3500 //para que visualmente se quede 2.5 seg
            });
        }).catch(error => {
            console.error('Hubo un error!', error);
            alert('Hubo un error al registrar el usuario.');
        });
    }
    //esto sera para actualizar
    const update = () => {
        axios.put("http://localhost:3001/update", {
            id: id,
            nombre: nombre,
            correo: correo,
            contrasena: contrasena
        }).then(() => {
            getusuarios();//para mostrar automaticamente al actualizar
            limpiar();//limpia campos automaticamente al actualizar
            Swal.fire({
                title: "Usuario Actualizado :)",
                html: "<i>Usuario " + nombre + " esta actualizado</i>",
                icon: "success",
                timer: 3500 //para que visualmente se quede 2.5 seg
            });
        });
    }

    //esto sera para borrar
    const deleteUsua = (val) => {
            Swal.fire({
                title: "Conformación de borrado",
                text: "¿Estás seguro de borrar a "+val.nombre+" permanentemente?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminar"
              }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://localhost:3001/delete/${val.id}`

                    ).then(() => {     
                        getusuarios();//para mostrar automaticamente al actualizar
                        limpiar();
                        Swal.fire({ //sin fire
                            title: "Usuario Borrado",
                            text: val.nombre+" fue eliminado",
                            icon: "success",
                            showConfirmButton:false,
                            timer:3000
                          });
                      }).catch(function (error){
                        Swal.fire({ //sin fire
                           icon: 'error',
                           title:'Ooops...',
                           text: 'No se puede eliminar',
                           footer: error.AxiosError
                          })
                      });
                }
              });
    }

    //esto es para ver usuarios
    const getusuarios = () => {
        axios.get("http://localhost:3001/usuarios")
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener usuarios:', error);
                // Aquí podrías mostrar un mensaje de error al usuario o realizar alguna acción adicional según tu aplicación
            });
    }

    //para limpair los campos usuarios
    const limpiar = () => {
        setNombre("");
        setCorreo("");
        setContrasena("");
        setEditar(false); //esto hace que si clickeas en cancelar regrese al boton de registrar
    }

    const editarUsuarios = (val) => {
        setEditar(true);

        setNombre(val.nombre);
        setCorreo(val.correo);
        setContrasena(val.password);
        setId(val.id);
    }

    return (
        <div className="container">
            <div className='arribaUsersCrud'>
            <h2 className='crudu'>CRUD de Usuarios</h2>
            <img src={booksIcon} alt="Icono de Usuarios" className="usuarios" />
            </div>
            <div className="container">
                <br></br>
                <div className="card text-center">
                    <div className="card-header">
                        Registrar Usuario
                    </div>
                    <div className="card-body">
                        <div className="input-group mb-3">
                            <span className="input-group-text">Nombre:</span>
                            <input type="text" onChange={(event) => setNombre(event.target.value)}
                                className="form-control" value={nombre} placeholder="Escribe nombre" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Correo:</span>
                            <input type="text" onChange={(event) => setCorreo(event.target.value)}
                                className="form-control" value={correo} placeholder="Escribe correo" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Contraseña:</span>
                            <input type="password" onChange={(event) => setContrasena(event.target.value)}
                                className="form-control" value={contrasena} placeholder="Escribe contraseña" />
                        </div>
                        {/* esto es un if para los botones de registrar y actualizar */}
                        {
                            editar == true ?
                                <div>
                                    <button className="btn btn-outline-warning  m-2" onClick={update}>Actualizar</button>,
                                    <button className="btn btn-outline-danger m-2" onClick={limpiar}>Cancelar</button>
                                    {/* m-2 es para darles espacio entre ellos */}
                                </div>
                                : <button className="btn btn-outline-success" onClick={add}>Registrar</button>
                        }

                    </div>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Contraseña</th>

                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuariosList.map((val, key) => {
                                return <tr key={val.id}>
                                    <th>{val.id}</th>
                                    <td>{val.nombre}</td>
                                    <td>{val.correo}</td>
                                    <td>{val.password}</td>

                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button"
                                                onClick={() => {
                                                    deleteUsua(val);
                                                }}
                                                className="btn btn-danger">Borrar</button>
                                            <button type="button"
                                                onClick={() => {
                                                    editarUsuarios(val);
                                                }}
                                                className="btn btn-info">Editar</button>
                                        </div>
                                    </td>
                                </tr>
                            })
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UsersCrud;
