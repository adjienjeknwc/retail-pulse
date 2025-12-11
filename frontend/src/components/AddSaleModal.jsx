import React, { useState } from 'react';
import { createSale } from '../api/api';

export default function AddSaleModal({ isOpen, onClose, products, onSaleSuccess }) {
  if (!isOpen) return null;

  const [selectedProductId, setSelectedProductId] = useState('');
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProductId) return alert("Please select a product");

    setLoading(true);
    // Find the full product details based on the ID selected
    const product = products.find(p => p._id === selectedProductId);

    // Prepare data for the backend
    const saleData = {
      items: [{
        product: product._id,
        name: product.name,
        qty: Number(qty),
        unit_price: product.sell_price
      }],
      payment_method: 'cash'
    };

    try {
      await createSale(saleData);
      onSaleSuccess(); // Refresh the dashboard
      onClose();       // Close the popup
      setQty(1);       // Reset form
      setSelectedProductId('');
    } catch (error) {
      console.error(error);
      alert('Failed to record sale');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Record New Sale</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Product</label>
            <select 
              className="w-full p-2 border rounded-lg bg-gray-50"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              required
            >
              <option value="">-- Choose Item --</option>
              {products.map(p => (
                <option key={p._id} value={p._id}>
                  {p.name} (₹{p.sell_price}) - Stock: {p.stock_on_hand}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input 
              type="number" 
              min="1"
              className="w-full p-2 border rounded-lg bg-gray-50"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Confirm Sale'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}