import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewStory() {
    const { id } = useParams();
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/story?id=${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch the story');
                }
                return response.json();
            })
            .then(data => {
                setStory(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center vh-100" aria-live="polite">Loading...</div>;
    }

    if (error) {
        return <div className="text-danger text-center mt-3">{error}</div>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <img 
                className="w-100 h-100 object-fit-contain" 
                src={story.image} 
                alt="Story" 
            />
        </div>
    );
}

export default ViewStory;
