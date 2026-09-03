import { useState } from 'react';
import RocketListScreen from './screens/RocketListScreen';
import RocketDetailScreen from './screens/RocketDetailScreen';

export default function App() {
  const [selectedRocket, setSelectedRocket] = useState(null);

  return (
    <div>
      {selectedRocket === null ? (
        <RocketListScreen onSelectRocket={(rocket) => setSelectedRocket(rocket)} />
      ) : (
        <RocketDetailScreen rocket={selectedRocket} onBack={() => setSelectedRocket(null)} />
      )}
    </div>
  );
}