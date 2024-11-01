import React, { useState, useEffect } from 'react';

import { get } from '../API/EndPoints';

const Home = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await get("http://localhost:7000/api/v1/blog/get-all-blogs");
                console.log("API Response:", response.data);  // Log the full response to inspect the structure

                // Update based on the actual structure
                if (Array.isArray(response.data)) {
                    setBlogs(response.data);
                } else if (Array.isArray(response.data.blogs)) { // In case blogs are nested inside another object
                    setBlogs(response.data.blogs);
                } else {
                    console.error("Unexpected data structure:", response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="blogs-container">
            {blogs.length > 0 ? (
                blogs.map((blog) => (
                    <div className="blog-card" key={blog.id}>
                        <img src={blog.img} alt={blog.title} className="blog-img" />
                        <div className="blog-content">
                            <h2 className="blog-title">{blog.title}</h2>
                            <p className="blog-description">{blog.dsc}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No blogs available.</p>
            )}
        </div>
    );
};

export default Home;
