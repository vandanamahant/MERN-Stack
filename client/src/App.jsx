import React, { useState, useEffect } from 'react';
import AddForm from './components/AddForm';

function App() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/items')
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
            const response = await fetch(`http://localhost:5000/api/items/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setItems((prev) => prev.filter((item) => item._id !== id));
            }
        } catch (err) {
            console.error('Error deleting item:', err);
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
                        <li key={item._id} className="item-card item-row">
                            <div>
                                <strong>{item.name}</strong>
                                <p>{item.description}</p>
                            </div>
                            <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;