import { useState, useEffect } from 'react';
import RocketCard from '../components/RocketCard';
import AddRocketModal from '../components/AddRocketModal';

export default function RocketListScreen({ onSelectRocket }) {
  const [rockets, setRockets] = useState([]);
  const [localRockets, setLocalRockets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State untuk mengontrol modal tambah roket (This state is for modal add rocket purpose)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchRockets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://lldev.thespacedevs.com/2.2.0/config/launcher/?manufacturer__name=SpaceX&mode=detailed&limit=20'
      );
      if (!response.ok) throw new Error('Gagal mengambil data dari server');
      const data = await response.json();
      setRockets(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRockets();
  }, []);

  const allRockets = [...rockets, ...localRockets];

  const filteredRockets = allRockets.filter((rocket) =>
    (rocket.full_name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNewRocket = (newRocketObj) => {
    setLocalRockets([newRocketObj, ...localRockets]);
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', fontSize: '18px' }}>Loading rockets...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>
        <p>Error: {error}</p>
        <button onClick={fetchRockets} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>SpaceX Rockets List</h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Filter rockets by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
        />
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ padding: '10px 16px', cursor: 'pointer', background: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          + Add Rocket
        </button>
      </div>

      {/* Modal Add Rocket */}
      {isModalOpen && (
        <AddRocketModal 
          onClose={() => setIsModalOpen(false)} 
          onAdd={handleAddNewRocket} 
        />
      )}

      <div>
        {filteredRockets.length === 0 ? (
          <p>No rockets found.</p>
        ) : (
          filteredRockets.map((rocket) => (
            <RocketCard 
              key={rocket.id} 
              rocket={rocket} 
              onClick={() => onSelectRocket(rocket)} 
            />
          ))
        )}
      </div>
    </div>
  );
}