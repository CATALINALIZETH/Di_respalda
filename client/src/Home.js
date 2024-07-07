import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container text-center">
      <h1>Bienvenido Librería CAT</h1>
      <div className="d-grid gap-2 col-6 mx-auto">
        <Link to="/register" className="btn btn-primary">Registrarse</Link>
        <Link to="/login" className="btn btn-secondary">Iniciar Sesión</Link>
      </div>
    </div>
  );
}

export default Home;
