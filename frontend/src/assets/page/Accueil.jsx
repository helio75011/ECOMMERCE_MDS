import React from 'react';
import './Accueil.css';
import { useState, useEffect } from 'react';

const Accueil = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('http://localhost:4612/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Données reçues:', data);
        setProduct(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        console.error('Erreur:', err);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div>
      {isLoading ? <h1>loading...</h1> : 
        <div>
            {product.map((x) => {
              return (
                <div>
                   <img src={x.image} />
                  <h3>{x.title}</h3>
                   <h4>{x.price}</h4>
                   <p>{x.description}</p>
                </div>
              )
            })
          }
        </div>
      }
    </div>
  );
};

export default Accueil;