import React from 'react';
import './Product.css';
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';        

const Product = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
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
        <div className='cathalog'>
            {product.map((x) => {
              return (
                <div className='product' key={x._id || x.id}>
                  <img src={x.images} alt="" />
                  <div className='titlePrice'>
                    <h3><b>{x.title}</b></h3>
                    <p>{x.price} €</p>
                  </div>
                  <div className='titleStock'>
                    <h3>{x.category}</h3>
                    <p>{x.stock ? "en stock" : "Épuisé"}</p>
                  </div>
                  <div className='buy'>
                    <Button label="Ajouter" />
                  </div>
                </div>
              )
            })
          }
        </div>
      }
    </div>
  );
};

export default Product;