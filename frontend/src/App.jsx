import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { Navbar } from './components/Navbar'
import { Home } from './components/Home'
import { CreateBlog } from './components/CreateBlog'
import { MyBlogs } from './components/MyBlogs'
import { EditBlog } from './components/EditBlog'
import { NoPage } from './components/NoPage'
import { Signin } from './components/Signin'
import { Signup } from './components/Signup'
import { OneBlog } from './components/OneBlog';


function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />}>  
            <Route index element={<Home />} />
            <Route path="/createBlog" element={<CreateBlog />} />
            <Route path="/myblogs" element={<MyBlogs />} />
            <Route path="/editblog/:id" element={<EditBlog />} />
            <Route path="/blogs/:id" element={<OneBlog />} />
            <Route path="*" element={<NoPage />} />
          </Route>

          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>


  );
}

// touch Home.jsx Home.css CreateBlog.jsx CreateBlog.css MyBlogs.jsx MyBlogs.css EditBlog.jsx EditBlog.css Signin.jsx Signin.css Signout.jsx Signout.css NoPage.jsx NoPage.css

export default App
