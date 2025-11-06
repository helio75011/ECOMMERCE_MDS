const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

exports.getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user.userId }).populate('products');
        if (!wishlist) {
            return res.status(200).json({ products: [] });
        }
        res.status(200).json(wishlist)
    } catch (error) {
        console.error('Erreur getWishlist:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.userId;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Produit introuvable' });
        }

        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, products: [productId] });
        } else {
            if (wishlist.products.includes(productId)) {
                return res.status(400).json({ error: 'Ce produit est déjà dans la wishlist' });
            }
            wishlist.products.push(productId);
        }

        await wishlist.save();
        res.status(200).json(wishlist);
    } catch (error) {
        console.error('erreur addToWishlist', error);
        res.status(500).json({ error: error.message });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.userId;

        const wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
            return res.status(404).json({ error: 'Aucune wishlist trouvée' });
        }

        wishlist.products = wishlist.products.filter(
            id => id.toString() !== productId
        );

        await wishlist.save();
        res.status(200).json({ message: 'Produit retiré de la wishlist', wishlist });

    } catch (error) {
        console.error('erreur removeFromWishlist:', error);
        res.status(500).json({ error: error.message });
    }
};