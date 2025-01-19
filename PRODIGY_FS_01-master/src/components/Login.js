
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', `Bearer ${data.token}`);
                alert('Login successful!');
                navigate('/protected');
            } else {
                alert(data.error || 'Login failed');
            }
        } catch (err) {
            alert('An error occurred');
        }
    };

    return (
        <div className="bg-white p-8 rounded shadow-md max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
            </form>
            <p className='text-center w-full text-slate-500 py-2'>Or Register With..</p>
            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={() => navigate("/")}>Register</button>
        </div>
    );
}

export default Login;
