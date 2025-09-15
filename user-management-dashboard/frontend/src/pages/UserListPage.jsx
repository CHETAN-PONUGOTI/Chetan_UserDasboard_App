import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userService from '../api/userService';

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        userService.getAllUsers()
            .then(response => {
                // Add a console.log to see the actual response from your Render API
                console.log("API Response:", response.data);

                // Safely access the data and ensure it's always an array
                const usersData = response.data && response.data.data;
                setUsers(Array.isArray(usersData) ? usersData : []);
            })
            .catch(err => {
                setError('Failed to fetch users.');
                console.error(err);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            userService.deleteUser(id)
                .then(() => {
                    fetchUsers(); // Refresh list after delete
                })
                .catch(err => {
                    setError('Failed to delete user.');
                    console.error(err);
                });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Users</h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Company</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">{user.name}</td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">{user.email}</td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">{user.company}</td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm space-x-2">
                                    <Link to={`/details/${user.id}`} className="text-blue-600 hover:text-blue-900">View</Link>
                                    <Link to={`/edit/${user.id}`} className="text-green-600 hover:text-green-900">Edit</Link>
                                    <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserListPage;