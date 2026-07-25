import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  // 1. Database se items fetch karna (GET request)
  const fetchItems = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/items');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // 2. Naya item add karna (POST request)
  const addItem = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      const newItem = await res.json();
      setItems([...items, newItem]); // UI update karna
      setName(''); // Input clear karna
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  // 3. Item delete karna (DELETE request)
  const deleteItem = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/items/${id}`, {
        method: 'DELETE',
      });
      setItems(items.filter((item) => item._id !== id)); // UI se hatana
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '500px', margin: 'auto' }}>
      <h2>MERN Stack Project - Sprint 11</h2>
      
      {/* Form for POST Request */}
      <form onSubmit={addItem} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Enter item name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '8px', flex: '1', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '8px 16px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add Item
        </button>
      </form>

      {/* List with Delete Button */}
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {items.map((item) => (
          <li key={item._id} style={{ display: 'flex', justifyContent: 'space-between', background: '#f9f9f9', padding: '10px', marginBottom: '8px', borderRadius: '4px', border: '1px solid #ddd' }}>
            <span>{item.name}</span>
            <button onClick={() => deleteItem(item._id)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;