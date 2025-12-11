const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const Sale = require('../models/Sale');
const { faker } = require('@faker-js/faker');
require('dotenv').config(); // Load .env to get MONGO_URI

const run = async () => {
  // Connect to DB
  await connectDB(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/local_dashboard');

  console.log('Clearing old data...');
  await Product.deleteMany({});
  await Sale.deleteMany({});

  console.log('Generating new products...');
  // Create products
  const categories = ['Grocery','Beverages','Stationery','Snacks','Household'];
  const products = [];
  
  for (let i = 0; i < 20; i++){
    const p = await Product.create({
      name: `${faker.commerce.productName()} ${i}`,
      category: faker.helpers.arrayElement(categories),
      sell_price: Number(faker.commerce.price(10,300,0)),
      cost_price: Number(faker.commerce.price(5,200,0)),
      stock_on_hand: faker.datatype.number({min:10, max:200}),
      reorder_level: faker.datatype.number({min:5, max:20})
    });
    products.push(p);
  }

  console.log('Generating sales history (this may take a moment)...');
  // Create sales for last 30 days
  const days = 30;
  for (let d = 0; d < days; d++){
    const date = new Date();
    date.setDate(date.getDate() - d);
    
    // Random number of sales per day
    const salesCount = faker.datatype.number({min:5, max:15});
    
    for (let s = 0; s < salesCount; s++){
      const itemsCount = faker.datatype.number({min:1, max:4});
      const items = [];
      
      for (let it = 0; it < itemsCount; it++){
        const p = faker.helpers.arrayElement(products);
        const qty = faker.datatype.number({min:1, max:5});
        
        items.push({
          product: p._id,
          name: p.name,
          qty,
          unit_price: p.sell_price,
          line_total: qty * p.sell_price
        });
        
        // Update stock
        await Product.findByIdAndUpdate(p._id, {$inc: { stock_on_hand: -qty } });
      }
      
      const total = items.reduce((a,b) => a + b.line_total, 0);
      
      // Randomize time between 8 AM and 8 PM
      const saleDate = new Date(date);
      saleDate.setHours(faker.datatype.number({min:8, max:20}), faker.datatype.number({min:0, max:59}));

      await Sale.create({ 
        date_time: saleDate, 
        total_amount: total, 
        items 
      });
    }
  }

  console.log('Seed complete!');
  process.exit(0);
};

run();