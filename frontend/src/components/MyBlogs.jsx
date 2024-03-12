import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Blogs } from './Blogs'

export function MyBlogs() {
  const [blogs, setBlogs] = useState([])

  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:3000/blogs/myblogs', {
      headers: {
        "Authorization": 'Bearer ' + token,
      }
    })
      .then(async (e) => {
        const res = await e.json()
        setBlogs(res.userBlogPosts)
      })

  }, [])

  function HandleMyBlog(blogId) {
    navigate('/blogs/' + blogId)
  }

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