import { useNavigate } from "react-router-dom"



export function Blogs({ blogs }) {

  const navigate = useNavigate()

  return (
    <> <div key='gg' value='gg' onClick={() => HandleBlog()} className=" grid grid-cols-1 md:grid-cols-2 gap-20 container mx-auto px-40">
      {blogs.map((blog, index) => {
        return (

          <div className="flex flex-col items-center">

            <img src={'http://localhost:3000/' + blog.imagePath} alt="Blog-Image" width={400} height={250} />
            <h1> {blog.title} </h1>
            <h3> {blog.description} </h3>
            <p> {blog.content} </p>
            <p className=" self-end"> - {blog.author} </p>

          </div>





        )
      })} </div>
    </>
  )
}