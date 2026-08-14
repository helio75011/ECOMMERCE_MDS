import React from 'react';
import './Accueil.css';  
import Product from '../../components/Product/Product';   

const Accueil = () => {
  return (
    <div>
      <header>
        <h1>ECOM</h1>
        <nav>
          <ul>
            <li>accueil</li>
            <li>à propos</li>
          </ul>
        </nav>
      </header>
      <Product />
    </div>
  );
};

export default Accueil;