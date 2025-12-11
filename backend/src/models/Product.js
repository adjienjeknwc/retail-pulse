const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'General' },
  sku: { type: String },
  barcode: { type: String },
  sell_price: { type: Number, required: true },
  cost_price: { type: Number },
  stock_on_hand: { type: Number, default: 0 },
  reorder_level: { type: Number, default: 5 },
}, { timestamps: true });

// This line is crucial - it exports the model so seed.js can use it
module.exports = mongoose.model('Product', ProductSchema);