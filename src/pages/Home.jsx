import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './HomePage';
import NewBlog from './NewBlog';
import BlogPost from './BlogPost';
import Header from '../components/Header';

const Home = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/newblog" element={<NewBlog />} />
            <Route path="/blogpost/:id" element={<BlogPost />} />
        </Routes>
      </Router>
    </div>
  )
}

export default Home
