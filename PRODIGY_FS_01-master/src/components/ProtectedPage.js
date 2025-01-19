
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedPage() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const res = await fetch('http://localhost:5000/api/auth/protected', {
                    method: 'GET',
                    headers: { Authorization: token },
                });
                if (res.ok) {
                    const result = await res.json();
                    setData(result.message);
                } else {
                    navigate('/login');
                }
            } catch (err) {
                navigate('/login');
            }
        };

        fetchData();
    }, [navigate]);

    const handleClick = ()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className="p-4 bg-green-100">
            <h1 className="text-2xl font-bold">Protected Page</h1>
            {data ? <p>{data}</p> : <p>Loading...</p>}
            <button className="w-fit bg-red-500 text-white p-1 rounded hover:bg-red-600"
            onClick={handleClick}>Logout</button>
        </div>
    );
}

export default ProtectedPage;
