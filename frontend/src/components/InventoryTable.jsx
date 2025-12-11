import React from 'react';
export default function InventoryTable({ products }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-600 uppercase font-medium">
          <tr>
            <th className="py-3 px-4">Product</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Price</th>
            <th className="py-3 px-4">Stock</th>
            <th className="py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map(p => {
            const isLow = p.stock_on_hand <= p.reorder_level;
            return (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-800">{p.name}</td>
                <td className="py-3 px-4 text-gray-500">{p.category}</td>
                <td className="py-3 px-4 text-gray-800">₹{p.sell_price}</td>
                <td className="py-3 px-4 font-mono">{p.stock_on_hand}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${isLow ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {isLow ? 'Low Stock' : 'In Stock'}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}