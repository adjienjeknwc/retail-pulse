const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ name: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStock = async (req, res) => {
  const { id } = req.params;
  const { delta } = req.body; // positive to add, negative to subtract
  try {
    const p = await Product.findById(id);
    if (!p) return res.status(404).json({ error: 'Product not found' });
    p.stock_on_hand = Math.max(0, p.stock_on_hand + Number(delta));
    await p.save();
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const body = req.body;
    const p = new Product(body);
    await p.save();
    res.status(201).json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};