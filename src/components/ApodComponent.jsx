import React, { useState, useEffect } from 'react';

const ApodComponent = () => {
    const [apodData, setApodData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApodData = async () => {
            const apiKey = import.meta.env.VITE_KEYAPI;
            const response = await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
            );
            const data = await response.json();
            console.log('Fetched data:', data);
            setApodData(data);
            setLoading(false);
        };

        fetchApodData();
    }, []);

    console.log('APOD data:', apodData);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Astronomy Picture of the Day</h2>
            {apodData && (
                <>
                    {apodData.media_type === 'image' ? (
                        <img src={apodData.url} alt={apodData.title} />
                    ) : (
                        <iframe
                            src={apodData.url}
                            title={apodData.title}
                            width="560"
                            height="315"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    )}
                    <h3>{apodData.title}</h3>
                    <p>{apodData.explanation}</p>
                </>
            )}
        </div>
    );
};

export default ApodComponent;
