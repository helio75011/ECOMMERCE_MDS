const Product = require('../models/Product');


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

exports.getAllProduct = async (req, res) => {
    try {
        const products = await Product.find({ isActive: true })
        // const product = await Product.findById(req.params.id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};