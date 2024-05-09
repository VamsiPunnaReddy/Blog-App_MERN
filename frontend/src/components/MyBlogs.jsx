import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Blogs } from './Blogs'

export function MyBlogs() {
  const [blogs, setBlogs] = useState([])

  const token = localStorage.getItem('token')

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