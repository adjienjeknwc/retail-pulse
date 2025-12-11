const mongoose = require('mongoose');

const SaleItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  qty: Number,
  unit_price: Number,
  line_total: Number
}, { _id: false });

const SaleSchema = new mongoose.Schema({
  date_time: { type: Date, default: Date.now },
  total_amount: { type: Number, required: true },
  tax_amount: { type: Number, default: 0 },
  payment_method: { type: String, default: 'cash' },
  items: [SaleItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Sale', SaleSchema);