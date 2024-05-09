import { useEffect, useState } from 'react'
import { Blogs } from './Blogs'
import axios from 'axios'

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export function Home() {
  const [blogs, setBlogs] = useState([])


  useEffect(() => {
    axios.get(BACKEND_URL + "/api/v1/blogs")
      .then(async (e) => {
        const res = e.data
        setBlogs(res.blogs)
      })

  }, [])




  return (
    <>
      <Blogs blogs={blogs} />
    </>
  )
}