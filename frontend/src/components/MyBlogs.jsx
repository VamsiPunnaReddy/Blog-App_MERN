import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Blogs } from './Blogs'
import { BACKEND_URL } from './Home'
import axios from 'axios'

export function MyBlogs() {
  const [blogs, setBlogs] = useState([])

  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(BACKEND_URL + "/api/v1/blogs/myblogs", {
      headers: {
        "Authorization": 'Bearer ' + token,
      }
    })
      .then(async (e) => {
        const res = e.data
        setBlogs(res.userBlogPosts)
      })

  }, [])

  return (
    <>
      {blogs.length > 0 ? (
        <>
          <Blogs blogs={blogs} />
        </>
      ) : (
        <h1>You Have Not Uploaded Any Blogs Yet</h1>
      )}
    </>
  )



}