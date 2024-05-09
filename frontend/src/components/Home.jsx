import { useEffect, useState } from 'react'
import { Blogs } from './Blogs'

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export function Home() {
  const [blogs, setBlogs] = useState([])


  useEffect(() => {
    fetch(BACKEND_URL + "/api/v1/blogs")
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