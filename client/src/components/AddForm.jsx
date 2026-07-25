import React, { useState } from 'react';


const INITIAL_FORM_STATE = { name: '', description: '' };

const FORM_FIELDS = [
    { id: 'name', label: 'Name', type: 'text', placeholder: 'Enter name...' },
    { id: 'description', label: 'Description', type: 'text', placeholder: 'Enter description...' }
];

function AddForm({ onItemAdded }) {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to submit data');

            const result = await response.json();
            setFormData(INITIAL_FORM_STATE);
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

            <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    );
}

export default AddForm;