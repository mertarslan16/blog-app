import React from 'react';
import BlogList from '../src/components/BlogList';
import BlogForm from '../src/components/BlogForm';
import './App.css'

const App: React.FC = () => {
  return (
    <div className='app'>
      <BlogForm />
      <BlogList />
    </div>
  );
};

export default App;
