import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="app">
      <h3>
        Você não forneceu os dados corretamente. Por favor, volte para a
        {' '}
        <Link to="/">página inicial</Link>
        .
      </h3>
    </div>
  );
}

export default ErrorPage;
