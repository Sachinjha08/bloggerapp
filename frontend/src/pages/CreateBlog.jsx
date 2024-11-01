import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../API/EndPoints';
import { toast } from 'react-hot-toast';

const CreateBlog = () => {
    const [blogData, setBlogData] = useState({
        title: '',
        dsc: '',
        img: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setBlogData({ ...blogData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            title: blogData.title,
            dsc: blogData.dsc,
            img: blogData.img,
        };

        try {
            await post('/api/v1/blog/create-blogs', formData);
            toast.success('Blog created successfully!');
            navigate('/');
        } catch (error) {
            setError('Failed to create the blog. Please try again.');
            toast.error('Error creating blog.');
        }
    };

    return (
        <div className="create-blog-container">
            <form className="create-blog-form" onSubmit={handleSubmit}>
                <h2>Create New Blog</h2>
                {error && <p className="error">{error}</p>}
                <input
                    type="text"
                    name="title"
                    placeholder="Blog Title"
                    value={blogData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="dsc"
                    placeholder="Blog Description"
                    value={blogData.dsc}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="img"
                    placeholder="Image URL"
                    value={blogData.img}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Create Blog</button>
            </form>
        </div>
    );
};

export default CreateBlog;
