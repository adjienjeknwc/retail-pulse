const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    // 1. Today's Sales
    const startOfDay = new Date();
    startOfDay.setHours(0,0,0,0);
    const endOfDay = new Date();
    endOfDay.setHours(23,59,59,999);

    const todaySalesAgg = await Sale.aggregate([
      { $match: { date_time: { $gte: startOfDay, $lte: endOfDay } } },
      { $group: { _id: null, total: { $sum: '$total_amount' }, count: { $sum: 1 } } }
    ]);

    // 2. Weekly Totals (Last 7 Days)
    const weekAgo = new Date(); 
    weekAgo.setDate(weekAgo.getDate() - 6);
    weekAgo.setHours(0,0,0,0);

    const weekly = await Sale.aggregate([
      { $match: { date_time: { $gte: weekAgo } } },
      { $project: { date: { $dateToString: { format: "%Y-%m-%d", date: "$date_time" } }, total: "$total_amount" } },
      { $group: { _id: "$date", total: { $sum: "$total" } } },
      { $sort: { _id: 1 } }
    ]);

    // 3. Top Products
    const topProducts = await Sale.aggregate([
      { $unwind: '$items' },
      { $group: { _id: '$items.name', revenue: { $sum: '$items.line_total' }, qty: { $sum: '$items.qty' } } },
      { $sort: { revenue: -1 } },
      { $limit: 5 }
    ]);

    // 4. Low Stock
    const lowStock = await Product.find({ $expr: { $lte: ['$stock_on_hand', '$reorder_level'] } }).limit(5);

    res.json({
      today: todaySalesAgg[0] || { total: 0, count: 0 },
      weekly,
      topProducts,
      lowStock
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Dashboard error' });
  }
});

module.exports = router;