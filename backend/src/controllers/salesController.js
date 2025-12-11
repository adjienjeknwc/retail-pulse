const Sale = require('../models/Sale');
const Product = require('../models/Product');

exports.createSale = async (req, res) => {
  try {
    const body = req.body; 
    // items: [{product_id, name, qty, unit_price}]
    const items = body.items.map(it => ({
      product: it.product,
      name: it.name,
      qty: it.qty,
      unit_price: it.unit_price,
      line_total: it.qty * it.unit_price
    }));

    const total_amount = items.reduce((s, i) => s + i.line_total, 0);

    const sale = new Sale({ 
      items, 
      total_amount, 
      tax_amount: body.tax_amount || 0, 
      payment_method: body.payment_method 
    });

    await sale.save();

    // Update inventory
    for (const it of items) {
      if (!it.product) continue;
      await Product.findByIdAndUpdate(it.product, { $inc: { stock_on_hand: -it.qty } });
    }

    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSales = async (req, res) => {
  try {
    const { start, end, page = 1, limit = 50 } = req.query;
    const q = {};
    if (start || end) {
      q.date_time = {};
      if (start) q.date_time.$gte = new Date(start);
      if (end) q.date_time.$lte = new Date(end);
    }

    const sales = await Sale.find(q)
      .sort({ date_time: -1 })
      .skip((page-1)*limit)
      .limit(Number(limit));

    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};