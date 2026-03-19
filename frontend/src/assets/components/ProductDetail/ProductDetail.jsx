import { useState, useEffect } from "react";
import "./ProductDetail.css";

const ProductDetail = () => {

    const [detail, setDetail] = useState([])
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
                setDetail(data);
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
            <div>
                <h2>Product Detail</h2>
                {isLoading ? <h1>loading...</h1> : 
                    <div>
                        {detail.map((detail) => {
                            return (
                                <div key={detail._id || detail.id}>
                                    <h3>{detail.title}</h3>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    );
};

export default ProductDetail;