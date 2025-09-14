import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userService from '../api/userService';

const UserForm = () => {
    const [user, setUser] = useState({
        name: '', email: '', phone: '', company: '',
        street: '', city: '', zipcode: '', lat: '', lng: ''
    });
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            userService.getUserById(id)
                .then(response => {
                    setUser(response.data.data);
                })
                .catch(err => {
                    console.error('Failed to fetch user', err);
                    setError('Failed to load user data.');
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Reset error before new submission

        if (!user.name || !user.email) {
            setError('Name and Email are required.');
            return;
        }

        const apiCall = isEditing ? userService.updateUser(id, user) : userService.createUser(user);

        apiCall
            .then(() => {
                navigate('/');
            })
            .catch(err => {
                const errorMsg = err.response?.data?.error || `Failed to ${isEditing ? 'update' : 'create'} user.`;
                setError(errorMsg);
                console.error(err);
            });
    };
    
    const renderInputField = (name, placeholder, type = 'text') => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 capitalize">{name}</label>
            <input
                type={type}
                name={name}
                id={name}
                value={user[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
    );

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">{isEditing ? 'Edit User' : 'Add New User'}</h1>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
            
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderInputField('name', 'John Doe')}
                    {renderInputField('email', 'john.doe@example.com', 'email')}
                    {renderInputField('phone', '123-456-7890')}
                    {renderInputField('company', 'Tech Corp')}
                    {renderInputField('street', '123 Main St')}
                    {renderInputField('city', 'Anytown')}
                    {renderInputField('zipcode', '12345')}
                    {renderInputField('lat', '-37.3159')}
                    {renderInputField('lng', '81.1496')}
                </div>
                
                <div className="flex items-center justify-end space-x-4">
                    <button type="button" onClick={() => navigate('/')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition duration-300">
                        Cancel
                    </button>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                        {isEditing ? 'Update User' : 'Create User'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;