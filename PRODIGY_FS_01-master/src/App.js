
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedPage from './components/ProtectedPage';

function App() {
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <Router>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/protected" element={<ProtectedPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
