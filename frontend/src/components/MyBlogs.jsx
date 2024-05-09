import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Blogs } from './Blogs'
import { BACKEND_URL } from './Home'

export function MyBlogs() {
  const [blogs, setBlogs] = useState([])

  const token = localStorage.getItem('token')

  useEffect(() => {
    fetch(BACKEND_URL + "/api/v1/blogs/myblogs", {
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