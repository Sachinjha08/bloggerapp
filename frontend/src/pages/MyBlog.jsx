import React, { useEffect, useState } from 'react';
import { get, dele, put } from '../API/EndPoints';
import { toast } from 'react-hot-toast';

const MyBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [editBlogId, setEditBlogId] = useState(null);
    const [updatedBlog, setUpdatedBlog] = useState({});

    const fetchMyBlogs = async () => {
        try {
            const response = await get('/api/v1/blog/get-user-blogs');
            setBlogs(response.data.blogs);
        } catch (error) {
            toast.error('Error fetching your blogs');
        }
    };

    useEffect(() => {
        fetchMyBlogs();
    }, []);

    const handleEdit = (blog) => {
        setEditBlogId(blog._id);
        setUpdatedBlog({
            title: blog.title || '',
            description: blog.dsc || '',
            img: blog.img || '',
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const partialUpdate = {};

        if (updatedBlog.title) partialUpdate.title = updatedBlog.title;
        if (updatedBlog.description) partialUpdate.dsc = updatedBlog.description;
        if (updatedBlog.img) partialUpdate.img = updatedBlog.img; // Ensure image is updated correctly

        try {
            await put(`/api/v1/blog/update-blogs/${editBlogId}`, partialUpdate);
            toast.success('Blog updated successfully!');
            fetchMyBlogs();
            setEditBlogId(null);
        } catch (error) {
            toast.error('Error updating blog');
        }
    };

    const handleDelete = async (id) => {
        try {
            await dele(`/api/v1/blog/delete-blogs/${id}`);
            toast.success('Blog deleted successfully!');
            fetchMyBlogs();
        } catch (error) {
            toast.error('Error deleting blog');
        }
    };

    return (
        <div className="my-blog-container">
            <h2>My Blogs</h2>
            <div className="blog-list">
                {blogs.map((blog) => (
                    <div key={blog._id} className="blog-card">
                        {editBlogId === blog._id ? (
                            <form onSubmit={handleUpdate} className="edit-form">
                                <input
                                    type="text"
                                    value={updatedBlog.title}
                                    onChange={(e) => setUpdatedBlog({ ...updatedBlog, title: e.target.value })}
                                    placeholder="Title"
                                />
                                <textarea
                                    value={updatedBlog.description}
                                    onChange={(e) => setUpdatedBlog({ ...updatedBlog, description: e.target.value })}
                                    placeholder="Description"
                                />
                                <input
                                    type="text"
                                    value={updatedBlog.img} // Updated field name to img
                                    onChange={(e) => setUpdatedBlog({ ...updatedBlog, img: e.target.value })}
                                    placeholder="Image URL"
                                />
                                <button type="submit">Update</button>
                                <button type="button" onClick={() => setEditBlogId(null)}>Cancel</button>
                            </form>
                        ) : (
                            <>
                                <img src={blog.img} alt={blog.title} className="blog-image" />
                                <h3>{blog.title}</h3>
                                <p>{blog.dsc}</p>
                                <div className="blog-actions">
                                    <button onClick={() => handleEdit(blog)}>Edit</button>
                                    <button onClick={() => handleDelete(blog._id)}>Delete</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBlog;
