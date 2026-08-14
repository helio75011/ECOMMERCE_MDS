import { useState, useEffect } from "react";
import { Button } from 'primereact/button';  
import { useParams, Link } from "react-router";
import "./ProductDetail.css";

const ProductDetail = () => {

    const [detail, setDetail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`);
                const response = await fetch(`${import.meta.env.VITE_TEST_API}/products/${id}`);

                const request = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: 'React Hooks POST Request Example' })
                }

                fetch(`${import.meta.env.VITE_TEST_API}/orders`, requestOptions)
                    .then(response => response.json())
                    .then(data => setPostId(data.id));

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
            <Link to="/"><Button label="< Retour" className="return" /></Link>
            <div>
                {isLoading ? (
                    <h1>loading...</h1>
                ) : error ? (
                    <p>{error}</p>
                ) : detail ? (
                    <div className="productDetail-main">
                        <div className="productDetail-img">
                            <img src={detail.images} alt={detail.title} />
                        </div>
                        <div className="productDetail-desc">
                            <div className="productDetail-detail">
                                <h3><b>{detail.title}</b></h3>
                                <p>{detail.description}</p>
                                <p>Prix: {detail.price} €</p>
                                <p>{detail.stock ? "en stock" : "Épuisé"}</p>
                            </div>
                            <div className="productDetail-wishlist">
                                <Button label="ajouter au favoris" className="wishlist" />
                            </div>
                        </div>
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