import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import booksIcon from './imagen/libr.png';

import Swal from 'sweetalert2';

function BooksCrud() {

    useEffect(() => {
        getlibros();
    }, []);

    const [isbn, setIsbn] = useState('');
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [fecha_registro, setFecha] = useState('');
    const [error, setError] = useState('');

    const [id_libros, setId_libros] = useState(0);
    const [librosList, setLibros] = useState([]);
    const [editar, setEditar] = useState(false);

    //para añadir libros
    const addl = () => {

        if (!isbn || !titulo || !autor) {
            Swal.fire({
                title: "Error",
                text: "Todos los campos son obligatorios",
                icon: "error",
                timer: 3500
            });
            return;
        }

        if (!fecha_registro) {
            setError('La fecha es obligatoria.');
            return;
        }

        const token = localStorage.getItem('token');
        axios.post("http://localhost:3001/createBook", {
            isbn: isbn,
            titulo: titulo,
            autor: autor,
            fecha_registro: fecha_registro
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                Swal.fire({
                    title: "El libro está registrado :)",
                    html: "<i>Libro " + titulo + " esta registrado</i>",
                    icon: "success",
                    timer: 3500 //para que visualmente se quede 2.5 seg
                });
                getlibros();
                limpiar();
            })
            .catch((error) => {
                console.error('Error al crear el libro:', error);
                // Maneja el error aquí
                setError('Error al crear el libro. Inténtalo de nuevo.');
            });
    }

    //esto es para ver libros
    const getlibros = () => {
        axios.get("http://localhost:3001/libros")
            .then((response) => {
                setLibros(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener usuarios:', error);
                // Aquí podrías mostrar un mensaje de error al usuario o realizar alguna acción adicional según tu aplicación
            });
    }

    // Update book
    const updateBook = () => {
        const token = localStorage.getItem('token');
        axios.put("http://localhost:3001/updateBook", {
            id_libros: id_libros,
            isbn: isbn,
            titulo: titulo,
            autor: autor,
            fecha_registro: fecha_registro
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                Swal.fire({
                    title: "Libro Actualizado :)",
                    html: "<i>Libro " + titulo + " está actualizado</i>",
                    icon: "success",
                    timer: 3500
                });
                getlibros();
                limpiar();
            })
            .catch((error) => {
                console.error('Error al actualizar el libro:', error);
                setError('Error al actualizar el libro. Inténtalo de nuevo.');
            });
    }

    // Delete book
    const deleteBook = (val) => {
        const token = localStorage.getItem('token');
        Swal.fire({
            title: "Confirmación de borrado",
            text: "¿Estás seguro de borrar el libro " + val.titulo + " permanentemente?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3001/deleteBook/${val.id_libros}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(() => {
                        Swal.fire({
                            title: "Libro Borrado",
                            text: val.titulo + " fue eliminado",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 3000
                        });
                        getlibros();
                        limpiar();
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Ooops...',
                            text: 'No se puede eliminar',
                            footer: error.message
                        });
                    });
            }
        });
    }

    // Clear form
    const limpiar = () => {
        setIsbn('');
        setTitulo('');
        setAutor('');
        setFecha('');
        setId_libros(0);
        setEditar(false);
    }

    const editarLibros = (val) => {
        setEditar(true);
        setIsbn(val.isbn);
        setTitulo(val.titulo);
        setAutor(val.autor);
        setFecha(val.fecha_registro);
        setId_libros(val.id_libros);
    }

    return (
        <div className="container">
            <div className='arribaUsersCrud'>
                <h2 className='crudu'>CRUD de Libros</h2>
                <img src={booksIcon} alt="Icono de Usuarios" className="usuarios" />
            </div>
            <div className="container">
                <br></br>
                <div className="card text-center">
                    <div className="card-header">
                        Registrar Libro
                    </div>
                    <div className="card-body">
                        <div className="input-group mb-3">
                            <span className="input-group-text">IsBn:</span>
                            <input type="text" onChange={(event) => setIsbn(event.target.value)}
                                className="form-control" value={isbn} placeholder="Escribe clave del libro" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Titúlo:</span>
                            <input type="text" onChange={(event) => setTitulo(event.target.value)}
                                className="form-control" value={titulo} placeholder="Escribe título del libro" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Autor:</span>
                            <input type="text" onChange={(event) => setAutor(event.target.value)}
                                className="form-control" value={autor} placeholder="Escribe el autor" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Fecha Publicación:</span>
                            <input type="date" onChange={(event) => setFecha(event.target.value)}
                                className="form-control" value={fecha_registro} placeholder="" />
                        </div>
                        {/* esto es un if para los botones de registrar y actualizar */}
                        {
                            editar ?
                                <div>
                                    <button className="btn btn-outline-warning m-2" onClick={updateBook}>Actualizar</button>
                                    <button className="btn btn-outline-danger m-2" onClick={limpiar}>Cancelar</button>
                                </div>
                                : <button className="btn btn-outline-success" onClick={addl}>Registrar</button>
                        }
                    </div>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID#</th>
                            <th scope="col">Autor</th>
                            <th scope="col">ISBN</th>
                            <th scope="col">Fecha Registro</th>
                            <th scope="col">Titúlo</th>
                            <th scope="col">Id usuario Registro</th>

                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            librosList.map((val, key) => {
                                return <tr>
                                    <th scope="row">{val.id_libros}</th>
                                    <th>{val.autor}</th>
                                    <td>{val.isbn}</td>
                                    <td>{val.fecha_registro}</td>
                                    <td>{val.titulo}</td>
                                    <td>{val.user_id}</td>

                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button"
                                                onClick={() => {
                                                    deleteBook(val);
                                                }}
                                                className="btn btn-danger">Borrar</button>
                                            <button type="button"
                                                onClick={() => {
                                                   editarLibros(val);
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

export default BooksCrud;
