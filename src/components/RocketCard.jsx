export default function RocketCard({ rocket, onClick }) {
    return (
      <div
        onClick={onClick}
        style={{
          display: 'flex',
          gap: '15px',
          border: '1px solid #ddd',
          padding: '15px',
          marginBottom: '10px',
          borderRadius: '6px',
          cursor: 'pointer',
          background: '#fff',
        }}
      >
        {/* Menangani Missing Data pada Gambar */}
        <img
          src={rocket.image_url || 'https://via.placeholder.com/120?text=No+Image'}
          alt={rocket.full_name || 'Rocket'}
          style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
        />
        <div>
          <h3 style={{ margin: '0 0 8px 0' }}>{rocket.full_name || 'Unnamed Rocket'}</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            {rocket.description ? rocket.description.substring(0, 100) + '...' : 'No description available.'}
          </p>
        </div>
      </div>
    );
  }