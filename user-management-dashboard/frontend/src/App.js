import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import UserListPage from './pages/UserListPage';
import UserDetailsPage from './pages/UserDetailsPage';
import UserForm from './components/UserForm';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<UserListPage />} />
            <Route path="/details/:id" element={<UserDetailsPage />} />
            <Route path="/add" element={<UserForm />} />
            <Route path="/edit/:id" element={<UserForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;