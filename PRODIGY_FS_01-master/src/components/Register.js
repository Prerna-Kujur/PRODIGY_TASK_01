
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                alert('User registered successfully!');
                navigate('/login');
            } else {
                const data = await res.json();
                alert(data.error || 'Registration failed');
            }
        } catch (err) {
            alert('An error occurred');
        }
    };

    return (
        <div className="bg-white p-8 rounded shadow-md max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full p-2 border rounded"
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                    onChange={handleChange}
                    required
                />
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Register</button>
            </form>
            <p className='text-center w-full text-slate-500 py-2'>Or Login With..</p>
            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={()=> navigate("/login")}>Login</button>
        </div>
    );
}

export default Register;
