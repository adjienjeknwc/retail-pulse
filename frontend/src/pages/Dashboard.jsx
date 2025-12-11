import React, { useEffect, useState } from 'react';
import { getDashboard, getProducts } from '../api/api';
import KpiCard from '../components/KpiCard';
import SalesChart from '../components/SalesChart';
import InventoryTable from '../components/InventoryTable';
import AddSaleModal from '../components/AddSaleModal'; // Import the new modal

export default function Dashboard(){
  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for popup

  // Function to load data (we can reuse this to refresh!)
  const loadData = async () => {
    try {
      const d = await getDashboard();
      setData(d);
      const p = await getProducts();
      setProducts(p);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=> {
    loadData();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading Dashboard...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">RetailPulse</h1>
          <p className="text-gray-500">Business Performance Dashboard</p>
        </div>
        
        {/* The New "Add Sale" Button */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm flex items-center gap-2 transition-all"
        >
          <span>+ New Sale</span>
        </button>
      </header>

      {/* KPI Section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <KpiCard title="Today's Revenue" value={data ? `₹${data.today.total.toFixed(0)}` : '₹0'} color="blue" />
        <KpiCard title="Transactions" value={data ? data.today.count : '0'} color="green" />
        <KpiCard title="Top Selling" value={data && data.topProducts[0] ? data.topProducts[0]._id : '—'} color="purple" />
      </section>

      {/* Charts & Lists */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4 text-gray-700">Sales Trends (Last 7 Days)</h2>
          <SalesChart data={data ? data.weekly : []} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4 text-gray-700">Top Performers</h2>
          <ol className="space-y-3">
            {data && data.topProducts.map((t, i) => (
              <li key={i} className="flex justify-between text-sm border-b pb-2 last:border-0">
                <span className="font-medium text-gray-700">{i+1}. {t._id}</span>
                <span className="text-gray-500">₹{t.revenue}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Inventory Table */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold mb-4 text-gray-700">Inventory Status</h2>
        <InventoryTable products={products} />
      </section>

      {/* The Popup Component */}
      <AddSaleModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        products={products}
        onSaleSuccess={loadData} // This tells dashboard to refresh after sale
      />
    </div>
  );
}