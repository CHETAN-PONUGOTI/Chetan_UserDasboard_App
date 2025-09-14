import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gray-800 text-white shadow-md">
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold hover:text-gray-300">
                        User Dashboard
                    </Link>
                    <Link
                        to="/add"
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        + Add User
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;