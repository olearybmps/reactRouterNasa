import React, { useState, useEffect } from 'react';

const NeoComponent = () => {
    const [neoData, setNeoData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNeoData = async () => {
            const apiKey = import.meta.env.VITE_KEYAPI;
            const currentDate = new Date().toISOString().split('T')[0];
            const response = await fetch(
                `https://api.nasa.gov/neo/rest/v1/feed?start_date=${currentDate}&end_date=${currentDate}&api_key=${apiKey}`
            );
            const data = await response.json();
            setNeoData(data);
            setLoading(false);
        };

        fetchNeoData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="neo-container">
            <h2>Near Earth Objects</h2>
            {neoData && (
                <>
                    <p>Total NEOs: {neoData.element_count}</p>
                    <ul className="neo-list">
                        {Object.values(neoData.near_earth_objects)[0].map(
                            (neo) => (
                                <li key={neo.id} className="neo-item">
                                    <h3>{neo.name}</h3>
                                    <p>
                                        Estimated Diameter:{' '}
                                        {
                                            neo.estimated_diameter.meters
                                                .estimated_diameter_min
                                        }{' '}
                                        -{' '}
                                        {
                                            neo.estimated_diameter.meters
                                                .estimated_diameter_max
                                        }{' '}
                                        meters
                                    </p>
                                    <p>
                                        Is Potentially Hazardous:{' '}
                                        {neo.is_potentially_hazardous_asteroid
                                            ? 'Yes'
                                            : 'No'}
                                    </p>
                                </li>
                            )
                        )}
                    </ul>
                </>
            )}
        </div>
    );
};

export default NeoComponent;
