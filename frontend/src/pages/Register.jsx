import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { post } from '../API/EndPoints'
const Register = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState({
        userName: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const request = await post('/api/v1/user/register', value);
            const response = request.data;
            console.log(response);
            if (response.success) {
                toast.success(response.message);
                navigate('/login');
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            }
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input type="text" name="userName" placeholder="Username" value={value.userName} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={value.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={value.password} onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
