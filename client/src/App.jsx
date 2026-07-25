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
                            <strong>{item.name}</strong>
                            <p>{item.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;