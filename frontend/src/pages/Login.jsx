import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../redux/store';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { post } from '../API/EndPoints'

const Login = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await post('/api/v1/user/login', formData);
            dispatch(authActions.login());
            toast.success('Login successful!');
            navigate('/');
        } catch (error) {
            setError('Login failed. Invalid credentials.');
            toast.error('Login failed. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
