import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import userIcon from './imagen/libr.png'; 
import booksIcon from './imagen/usuarios.png';

function Libros() {
    const location = useLocation();
    const { name } = location.state;
    const navigate = useNavigate();//para ir de pagina en pagina

    return (
        <div className="container text-center">
            <br></br>
            <h1 className='hola'>HOLA, {name}</h1>
            <p>Bienvenido a la página de libros</p>
            <div className="d-grid gap-2 col-6 mx-auto mt-4">
            <button className="btn btn-warning" onClick={() => navigate('/users-crud')}>
                    <img src={booksIcon} alt="Icono de Usuarios" className="button-icon" />
                    Usuarios
                </button>
                <button className="btn btn-success" onClick={() => navigate('/books-crud')}>
                    <img src={userIcon} alt="Icono de Libros" className="button-icon" />
                    Libros
                </button>
            </div>
        </div>
    );
}

export default Libros;
