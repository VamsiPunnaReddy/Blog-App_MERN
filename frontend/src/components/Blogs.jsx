import { useNavigate } from "react-router-dom"



export function Blogs({ blogs }) {

  const navigate = useNavigate()

  async function HandleBlog(blogId) {
    navigate('/blogs/' + blogId);
  }

  return (
    <> <div key='blog' value='blogs'  className="container grid grid-cols-1 md:grid-cols-2 gap-20 mx-auto px-40 ">
      {blogs.map((blog, index) => {
        return (

                    <div onClick={() => HandleBlog(blog._id)} className=" text-white">

            <img src={'http://localhost:3000/' + blog.imagePath} alt="Blog-Image" className="" />
            <h1> {blog.title} </h1>
            <h3> {blog.description} </h3>
            <p> {blog.content} </p>
            <p className=" self-end"> - {blog.author} </p>

          </div>
// grid grid-cols-2 grid-rows-5




        )
      })} </div>
    </>
  )
}