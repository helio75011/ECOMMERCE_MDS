const Product = require('../models/Product');


// POST /api/products
exports.createProduct = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: "Seul un admin peut créer un produit" })
        }

        const { title, descritption, price, images, category, stock, isActive } = req.body;

        if (!title || !price) {
            return res.status(400).json({ error: "le titre et le prix sont obligatoire" })
        }
        const newProduct = new Product({ title, descritption, price, images, category, stock, isActive, owner: req.user.userId })

        await newProduct.save();
        res.status(201).json(newProduct);

    } catch (error) {
        console.error("❌ Erreur createProduct:", error);
        res.status(400).json({ error: error.message })
    }
};