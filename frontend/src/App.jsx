// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [view, setView] = useState('signup');
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', role: 'startup', industry: ''
  });
  const [matches, setMatches] = useState([]);

  const handleSignup = async () => {
    const res = await axios.post(`${API_BASE}/signup`, formData);
    setUser(res.data);
    setView('dashboard');
  };

  const getMatches = async () => {
    const res = await axios.get(`${API_BASE}/match/${user.id}`);
    setMatches(res.data);
  };

  const handleCheckout = async () => {
    const res = await axios.post(`${API_BASE}/create-checkout-session`);
    window.location.href = res.data.url;
  };

  if (view === 'signup') {
    return (
      <div className="p-8 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Join AIHealthCollab</h2>
        <input className="block mb-2 p-2 w-full" placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
        <input className="block mb-2 p-2 w-full" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
        <select className="block mb-2 p-2 w-full" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
          <option value="startup">AI Startup</option>
          <option value="partner">Healthcare Partner</option>
        </select>
        <input className="block mb-4 p-2 w-full" placeholder="Industry (e.g., Radiology)" value={formData.industry} onChange={e => setFormData({ ...formData, industry: e.target.value })} />
        <button onClick={handleSignup} className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Welcome, {user.name}</h2>
      <p className="mb-4">Your Role: {user.role} | Industry: {user.industry}</p>
      <button onClick={getMatches} className="bg-green-600 text-white px-4 py-2 rounded mb-4">Find Partners</button>
      <button onClick={handleCheckout} className="bg-purple-600 text-white px-4 py-2 rounded ml-4">Upgrade to Pro</button>
      <ul className="mt-6">
        {matches.map((m, i) => (
          <li key={i} className="border p-2 mb-2">Matched Partner ID: {m.partner_id}<br />Shared Interest: {m.shared_interest}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
