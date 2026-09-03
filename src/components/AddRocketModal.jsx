import { useState } from 'react';

export default function AddRocketModal({ onClose, onAdd }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newRocket = {
      id: 'local-' + Date.now(),
      full_name: name,
      description: description || 'No description provided.',
      image_url: null,
      launch_cost: 'Unknown',
      manufacturer: { country_code: 'USA' },
      maiden_flight: '2026-01-01',
    };

    onAdd(newRocket);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        background: '#fff', padding: '20px', borderRadius: '8px',
        width: '100%', maxWidth: '400px', fontFamily: 'Arial, sans-serif'
      }}>
        <h2>Add New Rocket</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Rocket Name</label>
            <input
              type="text"
              placeholder="e.g. Falcon Heavy V2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Description</label>
            <textarea
              placeholder="Enter rocket description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: '8px 14px', background: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ padding: '8px 14px', background: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Save Rocket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}