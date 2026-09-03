export default function RocketDetailScreen({ rocket, onBack }) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <button 
          onClick={onBack}
          style={{ marginBottom: '20px', padding: '6px 12px', cursor: 'pointer' }}
        >
          ← Back to List
        </button>
  
        <h1>{rocket.full_name || 'Unnamed Rocket'}</h1>
  
        {/* Menangani Missing Data Gambar */}
        <img
          src={rocket.image_url || 'https://via.placeholder.com/600x300?text=No+Image+Available'}
          alt={rocket.full_name || 'Rocket'}
          style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }}
        />
  
        <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
          <p><strong>Description:</strong> {rocket.description || 'Data missing'}</p>
          <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '15px 0' }} />
          
          {/* Detail Field */}
          <p><strong>Cost per Launch:</strong> {rocket.launch_cost || 'Data missing'}</p>
          <p><strong>Country:</strong> {rocket.manufacturer?.country_code || 'Data missing'}</p>
          <p><strong>First Flight (Maiden Flight):</strong> {rocket.maiden_flight || 'Data missing'}</p>
        </div>
      </div>
    );
  }