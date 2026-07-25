import React, { useState, useEffect } from 'react';
import AddForm from './components/AddForm';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editDescription, setEditDescription] = useState('');

    useEffect(() => {
        fetch(`${API_URL}/api/items`)
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleItemAdded = (newItem) => {
        setItems((prev) => [...prev, newItem]);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/items/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setItems((prev) => prev.filter((item) => item._id !== id));
            }
        } catch (err) {
            console.error('Error deleting item:', err);
        }
    };

    const handleEditClick = (item) => {
        setEditingId(item._id);
        setEditName(item.name);
        setEditDescription(item.description || '');
    };

    const handleUpdate = async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/items/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: editName, description: editDescription }),
            });
            const updatedItem = await response.json();
            if (response.ok) {
                setItems((prev) => prev.map((item) => (item._id === id ? updatedItem : item)));
                setEditingId(null);
            }
        } catch (err) {
            console.error('Error updating item:', err);
        }
    };

    return (
        <div className="app-container">
            <h2>MERN Stack App</h2>
            <AddForm onItemAdded={handleItemAdded} />
            <hr className="divider" />
            <h3>Items List</h3>
            {loading ? (
                <p>Loading...</p>
            ) : items.length === 0 ? (
                <p>No items found.</p>
            ) : (
                <ul className="item-list">
                    {items.map((item) => (
                        <li key={item._id} className="item-card">
                            {editingId === item._id ? (
                                <div className="edit-form">
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                    />
                                    <div className="btn-group">
                                        <button onClick={() => handleUpdate(item._id)}>Save</button>
                                        <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="item-row">
                                    <div className="item-details">
                                        {item.imageUrl && (
                                            <img src={item.imageUrl} alt={item.name} className="item-thumbnail" />
                                        )}
                                        <div>
                                            <strong>{item.name}</strong>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                    <div className="btn-group">
                                        <button className="edit-btn" onClick={() => handleEditClick(item)}>Edit</button>
                                        <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;