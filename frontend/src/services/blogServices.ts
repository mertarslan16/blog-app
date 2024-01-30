const BASE_URL = 'http://localhost:5000/api';

interface Blog {
  _id: string;
  title: string;
}

export const getBlogs = async (): Promise<Blog[]> => {
  const response = await fetch(`${BASE_URL}/blogs`);
  const data = await response.json();
  console.log("data", data);
  return data;
};

export const addBlog = async (blog: { title: string }): Promise<void> => {
  await fetch(`${BASE_URL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blog),
  });
};

export const deleteBlog = async (_id: string): Promise<void> => {
  const stringId = _id.toString();
  await fetch(`${BASE_URL}/blogs/${stringId}`, {
    method: 'DELETE',
  });
};

export const updateBlog = async (_id: string, updatedBlog: { title: string }): Promise<void> => {
  const stringId = _id.toString();
  await fetch(`${BASE_URL}/blogs/${stringId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedBlog),
  });
};