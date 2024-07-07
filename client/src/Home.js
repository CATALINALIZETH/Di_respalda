import React from 'react';
import { Link } from 'react-router-dom';
import gatoImg from '../src/imagen/gato.jpg';

function Home() {
    return (
      <div className="container text-center">
        <br />
        <h1>Bienvenido a Librería CAT</h1>
        <img className='gato' src={gatoImg} alt="Gato" />
        <div className="d-grid gap-2 col-6 mx-auto mt-4">
          <Link to="/Register" className="btn btn-primary">Registrarse</Link>
          <Link to="/Login" className="btn btn-secondary">Iniciar Sesión</Link>
        </div>
      </div>
    );
  }
export default Home;
