import React, { useState } from 'react';
import { addBlog } from '../services/blogServices';
import '../css/BlogForm.css'

const BlogForm: React.FC = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() !== '') {
      await addBlog({ title });
      setTitle('');
    }
  };

  return (
    <div className='blog-form'>
      <h2 className='blog-form-title'>Add New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <div className='add-button'> 
        <button type="submit">Add Blog</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;