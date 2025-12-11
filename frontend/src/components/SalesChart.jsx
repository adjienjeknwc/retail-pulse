import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function SalesChart({ data }) {
  const formatted = (data || []).map(d => ({ date: d._id, total: d.total }));
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="date" tick={{fontSize: 12}} stroke="#9ca3af" />
          <YAxis tick={{fontSize: 12}} stroke="#9ca3af" />
          <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
          <Line type="monotone" dataKey="total" stroke="#4f46e5" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}