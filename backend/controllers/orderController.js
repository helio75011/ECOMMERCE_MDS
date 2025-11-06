const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
    try {
        const { products } = req.body;

        if(!products || products.length === 0) {
            return res.status(400).json({ error: "Aucun produit dans la commande" });
        }

        let total = 0;
        const productList = [];

        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                return req.status(404).json({ error: `Produit ${item.product} introuvable` });
            }
            const price = product.price;
            total += price * item.quantity;

            productList.push({
                product: product._id,
                quantity: item.quantity,
                price
            });
        }

        const newOrder = new Order({
            user: req.user.userId,
            products: productList,
            totalAmount: total
        });

        await newOrder.save();
        res.status(201).json(newOrder);

    } catch (error) {
        console.error("Erreur createOrder:", error);
        res.status(500).json({ error: error.message })
    }
}; 