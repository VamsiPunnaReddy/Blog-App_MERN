import { useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"

export function OneBlog() {
  const [blog, setBlog] = useState({})
  const [isUser, setIsUser] = useState(false)

  const navigate = useNavigate()

  const { id } = useParams()
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('author')

  useEffect(() => {
    fetch('http://localhost:3000/blogs/' + id, {
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

    const res = await fetch('http://localhost:3000/blogs/' + blogId, {
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
      <div>
        <img src={'http://localhost:3000/' + blog.imagePath} alt="Blog-Image" width={400} height={250} />
        <h1> {blog.title} </h1>
        <h3> {blog.description} </h3>
        <p> {blog.content} </p>
        <p> - {blog.author} </p>
        {isUser ? (
          <div className="buttons">
            <button className="edit-button" onClick={() => HandleEdit(blog._id)}>Edit Blog</button>
            <button className="delete-button" onClick={() => HandleDelete(blog._id)}>Delete Blog</button>
          </div>
        ) : <></>}
      </div>
    </>
  )
}