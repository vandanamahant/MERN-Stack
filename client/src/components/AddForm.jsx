import React, { useState } from 'react';

const INITIAL_FORM_STATE = { name: '', description: '' };

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const FORM_FIELDS = [
    { id: 'name', label: 'Name', type: 'text', placeholder: 'Enter name...' },
    { id: 'description', label: 'Description', type: 'text', placeholder: 'Enter description...' }
];

function AddForm({ onItemAdded }) {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);
            if (image) {
                data.append('image', image);
            }

            const response = await fetch(`${API_URL}/api/items`, {
                method: 'POST',
                body: data,
            });

            if (!response.ok) throw new Error('Failed to submit data');

            const result = await response.json();
            setFormData(INITIAL_FORM_STATE);
            setImage(null);
            if (onItemAdded) onItemAdded(result);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="item-form">
            <h3>Add New Item</h3>
            {error && <p className="error-text">{error}</p>}

            {FORM_FIELDS.map((field) => (
                <div key={field.id} className="form-group">
                    <input
                        type={field.type}
                        name={field.id}
                        placeholder={field.placeholder}
                        value={formData[field.id]}
                        onChange={handleChange}
                        required
                    />
                </div>
            ))}

            <div className="form-group">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>

            <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    );
}

export default AddForm;