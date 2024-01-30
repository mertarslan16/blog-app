import React, { useState, useEffect } from 'react';
import { getBlogs, deleteBlog, updateBlog } from '../services/blogServices';
import '../css/BlogList.css';
import UpdatePopup from './UpdatePopUp'; // Import the UpdatePopup component

interface Blog {
  _id: string;
  title: string;
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs: Blog[] = await getBlogs();
        setBlogs(fetchedBlogs.map(blog => ({ _id: blog._id, title: blog.title})));
      } catch (error) {
        console.error('Fetch Blogs Error:', error);
      }
    };

    fetchBlogs();
  }, [blogs]);

  const handleDelete = async (_id: string) => {
    await deleteBlog(_id);
    const updatedBlogs = blogs.filter(blog => blog._id !== _id);
    setBlogs(updatedBlogs);
  };

  const handleUpdate = (blog: Blog) => {
    setSelectedBlog(blog);
    setShowUpdatePopup(true);
  };

  const handleUpdateSubmit = async (newTitle: string) => {
    if (selectedBlog) {
      await updateBlog(selectedBlog._id, { title: newTitle });
      setShowUpdatePopup(false);
      const updatedBlogs: Blog[] = await getBlogs();
      setBlogs(updatedBlogs.map(blog => ({ _id: blog._id, title: blog.title })));
    }
  };

  return (
    <div className="blog-list">
      <h2 className="blog-list-title">Blog List</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog._id}>
            {blog.title}{' '}
            <button onClick={() => handleDelete(blog._id)}>Delete</button>
            <button className='update-button' onClick={() => handleUpdate(blog)}>Update</button>
          </li>
        ))}
      </ul>

      {showUpdatePopup && selectedBlog && (
        <UpdatePopup
          blog={selectedBlog}
          onSubmit={(newTitle: string) => handleUpdateSubmit(newTitle)}
          onClose={() => setShowUpdatePopup(false)}
        />
      )}
    </div>
  );
};

export default BlogList;