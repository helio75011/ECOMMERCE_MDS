const Product = require('../models/Product');

// Utils pagination
const parsePageLimit = (q) => {
  const page = Math.max(parseInt(q.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(q.limit) || 20, 1), 100);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

// POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, images = [], category, stock = 0, isActive = true } = req.body;
    if (!title || price === undefined) {
      return res.status(400).json({ error: 'title and price are required' });
    }
    const product = await Product.create({
      owner: req.user.userId,
      title, description, price, images, category, stock, isActive
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /api/products  -> liste des produits DU user
exports.getMyProducts = async (req, res) => {
  try {
    const { page, limit, skip } = parsePageLimit(req.query);
    const query = { owner: req.user.userId };

    // petits filtres facultatifs
    if (typeof req.query.isActive !== 'undefined') query.isActive = req.query.isActive === 'true';
    if (req.query.q) query.title = { $regex: req.query.q, $options: 'i' };

    const [items, total] = await Promise.all([
      Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments(query)
    ]);
    res.status(200).json({ items, page, limit, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/products/:id  -> détail SI owner = user
exports.getMyProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, owner: req.user.userId });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /api/products/:id  -> update SI owner
exports.updateMyProduct = async (req, res) => {
  try {
    const allowed = ['title', 'description', 'price', 'images', 'category', 'stock', 'isActive'];
    const updates = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.userId },
      updates,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/products/:id  -> delete SI owner
exports.deleteMyProduct = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ _id: req.params.id, owner: req.user.userId });
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
