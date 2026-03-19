import { useState, useEffect } from "react";
import { Button } from 'primereact/button';  
import { useParams, Link } from "react-router";
import "./ProductDetail.css";

const ProductDetail = () => {

    const [detail, setDetail] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Données reçues:', data);
                setDetail(data);
                setIsLoading(false);

            } catch (err) {
                setError(err.message);
                console.error('Erreur:', err);
                setIsLoading(false)
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    return (
        <div>
            <Link to="/"><Button label="< Retour" /></Link>
            <div>
                <h2>Product Detail</h2>
                {isLoading ? ( 
                    <h1>loading...</h1> 
                ) : detail ? (
                    <div>
                        <h3>{detail.title}</h3>
                        <p>{detail.description}</p>
                        <p>Prix: {detail.price} €</p>
                        <p>{detail.stock ? "en stock" : "Épuisé"}</p>
                    </div>
                ) : (
                    <p>produit introuvable</p>
                )
                }
            </div>
        </div>
    );
};

export default ProductDetail;