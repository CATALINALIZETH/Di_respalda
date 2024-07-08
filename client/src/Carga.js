import React from 'react';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
import './Loader.css'; // Estilo para personalizar el loader

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Carga = () => {
  return (
    <div className="loader-container">
      <ClipLoader color={'#36D7B7'} loading={true} css={override} size={50} />
      <p>Cargando...</p>
    </div>
  );
};

export default Carga;
