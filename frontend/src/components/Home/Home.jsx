import { useState, useEffect } from 'react'
import SpotCard from '../SpotCard/SpotCard'

function Home() {
    const [spots, setSpots] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const getHomeSpots = async () => {
        try {
            const response = await fetch(`/api/spots`);
            const data = await response.json();
            console.log('API Data: ', data.Spots);
            return data.Spots;
        } catch (err) {
            console.log(err);
            setError('Failed to load spots...');
            return [];
        }
    }

    useEffect(() => {
        const loadSpots = async () => {
            setLoading(true);
            try {
                const homeSpots = await getHomeSpots();
                setSpots(homeSpots);  // Set the fetched spots here
            } finally {
                setLoading(false);
            }
        }

        loadSpots();
    }, []);

    return (
        <div className="home">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="spots-grid">
                    {spots.map(spot => <SpotCard spot={spot} key={spot.id} />)}
                </div>
            )}
            {error && <p>{error}</p>}
        </div>
    )
}

export default Home;
