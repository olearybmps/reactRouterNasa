import React, { useState, useEffect } from 'react';


const EpicComponent = () => {
    const [epicData, setEpicData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEpicData = async () => {
            const apiKey = import.meta.env.VITE_KEYAPI;
            const response = await fetch(
                `https://api.nasa.gov/EPIC/api/natural/images?api_key=${apiKey}`
            );
            const data = await response.json();
            setEpicData(data);
            setLoading(false);
        };

        fetchEpicData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="epic-container">
            <h2>Earth Polychromatic Imaging Camera (EPIC)</h2>
            {epicData.length > 0 ? (
                <ul className="epic-list">
                    {epicData.map((epic) => (
                        <li key={epic.identifier} className="epic-item">
                            <h3>{epic.caption}</h3>
                            <img
                                src={`https://api.nasa.gov/EPIC/archive/natural/${epic.date
                                    .split(' ')[0]
                                    .replace(/-/g, '/')}/png/${
                                    epic.image
                                }.png?api_key=${import.meta.env.VITE_KEYAPI}`}
                                alt={epic.caption}
                                className="epic-image"
                            />
                            <p>Date: {epic.date}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No EPIC data available.</p>
            )}
        </div>
    );
};

export default EpicComponent;
