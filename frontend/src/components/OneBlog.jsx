import { useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BACKEND_URL } from "./Home"

export function OneBlog() {
  const [blog, setBlog] = useState({})
  const [isUser, setIsUser] = useState(false)

  const navigate = useNavigate()

  const { id } = useParams()
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('author')

  useEffect(() => {
    fetch(BACKEND_URL + "/blogs/" + id, {
      headers: {
        "Authorization": 'Bearer ' + token,
      }
    })
      .then(async (e) => {
        const res = await e.json()
        if (res.author == username) {
          setIsUser(true)
        }
        setBlog(res)
      })
  }, [])

  async function HandleEdit(blogId) {
    navigate('/editblog/' + blogId)
  }

  async function HandleDelete(blogId) {

    const res = await fetch(BACKEND_URL + "/blogs/" + blogId, {
      method: 'DELETE',
      headers: {
        "Authorization": 'Bearer ' + token,
      }
    })
    console.log(res)
    if (res.ok) {
      navigate('/')
    }
    else {
      alert('Wrong Credentials')
    }
  }

  return (
    <>
      <div className="container mx-auto px-8 md:px-12 lg:px-16 xl:px-28 py-10">

        {isUser ? (
          <div className="flex justify-center gap-12 mb-8">
            <button className="rounded-md bg-blue-600 px-4 py-2 text-sm md:text-md lg:text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" onClick={() => HandleEdit(blog._id)}>Edit Blog</button>
            <button className="rounded-md bg-blue-600 px-4 py-2 text-sm md:text-md lg:text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" onClick={() => HandleDelete(blog._id)}>Delete Blog</button>
          </div>
        ) : <></>}

        <img className=" w-full h-80 object-cover " src={blog.image.url} alt="Blog-Image" />
        <h1 className="mt-2 text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"> {blog.title} </h1>
        <p className="mt-2 text-gray-600 mb-6 text-sm sm:text-base " > {blog.description} </p>
        <div className="prose min-w-full prose-li:marker:text-black prose-headings:m-0" dangerouslySetInnerHTML={{ __html: blog.content }} />

        <div className="flex flex-col gap-2  sm:flex-row sm:justify-between mt-6">
          <p title={`${new Date(blog.date).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}, ${new Date(blog.date).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Kolkata",
          })}, Published date`} className="self-end text-sm font-semibold text-gray-700"><b className="text-base font-bold text-black">Published : </b> {new Date(blog.date).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
          <p className="self-end italic"> <b className="not-italic">Author: </b> {blog.author} </p>

        </div>


      </div>
    </>
  )
}