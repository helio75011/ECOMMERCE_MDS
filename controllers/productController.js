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

exports.getProductById = async (req, res) => {
    try {
        const products = await Product.findById(req.params.id)
        if (!products) {
            return res.status(404).json({ error: error.message })
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: "Seul un admin peut modifier un produit" })
        }

        const updates = { ...req.body };
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        ).select('-password')

        if (!updatedProduct) {
            res.status(404).json({ error: error.message })
        }
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: "Seul un admin peut supprimer un produit" })
        }
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deleteProduct) {
            console.log("Produit supprimé:", deleteProduct);
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}