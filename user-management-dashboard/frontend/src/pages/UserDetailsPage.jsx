import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import userService from '../api/userService';

const UserDetailsPage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const { id } = useParams();

    useEffect(() => {
        userService.getUserById(id)
            .then(response => {
                setUser(response.data.data);
            })
            .catch(err => {
                setError('Failed to fetch user details.');
                console.error(err);
            });
    }, [id]);

    if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
    if (!user) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-gray-800 text-white p-4">
                     <h1 className="text-2xl font-bold">{user.name}</h1>
                     <p className="text-gray-300">{user.email}</p>
                </div>
                <div className="p-6 space-y-4">
                    <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
                    <p><strong>Company:</strong> {user.company || 'N/A'}</p>
                    <p><strong>Address:</strong> {`${user.street || ''}, ${user.city || ''}, ${user.zipcode || ''}`}</p>
                    <p><strong>Geo (Lat, Lng):</strong> {user.lat || 'N/A'}, {user.lng || 'N/A'}</p>
                    <div className="mt-6">
                        <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                            &larr; Back to List
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsPage;