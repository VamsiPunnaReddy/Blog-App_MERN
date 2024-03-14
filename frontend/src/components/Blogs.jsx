import { useNavigate } from "react-router-dom"



export function Blogs({ blogs }) {

  const navigate = useNavigate()

  async function HandleBlog(blogId) {
    navigate('/blogs/' + blogId);
  }

  return (

    <>
      <div className="bg-blue-200">



        <div key='blog' value='blogs' className=" container grid place-items-center grid-cols-1 md:grid-cols-2  gap-16 mx-auto px-4 py-6 sm:py-8 xl:px-40">
          {blogs.map((blog, index) => {
            return (

              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">

                <img onClick={() => HandleBlog(blog._id)} src={'http://localhost:3000/' + blog.imagePath} alt="Blog-Image" className="rounded-t-lg w-full h-60 bg-auto " />

                <div className="p-5">
                  <h5 className="mb-2 text-xl  font-semibold tracking-tight text-gray-900 line-clamp-1 pr-8">{blog.title} dfsdfs dfdfsfs  df sdfsdf sdfsdf</h5>

                  <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400 line-clamp-3">{blog.description} sg sg gasg sddgasdjdfkhm sdfh;dlmh;djhmpsdh ojkdfhksdlkhsdnmh klngklfndgkl;ng ggplmkfgkl;dnmfgklng dfgkl;mndfgklndflkg gklmfgkn</p>

                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between mb-3">
                    <p className="text-base font-medium">{new Date(blog.date).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                    <button onClick={() => HandleBlog(blog._id)} className="flex w-fit items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                      Read more
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                    </button>
                  </div>

                  <p className="text-sm flex justify-end font-semibold"> - {blog.author} </p>
                </div>
              </div>




            )
          })} </div>
      </div>
    </>
  )
}