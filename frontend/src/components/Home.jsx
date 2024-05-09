import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Blogs } from './Blogs'

export function Home() {
  const [blogs, setBlogs] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:3000/blogs/')
      .then(async (e) => {
        const res = await e.json()
        setBlogs(res.blogs)
      })

  }, [])

  


  return (
    <>
      <Blogs blogs={blogs} />
    </>
  )
}