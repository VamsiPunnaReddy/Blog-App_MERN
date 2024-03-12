import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function CreateBlog() {

  const [redirect, setRedirect] = useState(false)

  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  async function CreateNewBlog(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const titleValue = data.get('title');
    const descriptionValue = data.get('description');
    const contentValue = data.get('content');
    const imageFile = data.get('image');

    data.set('title', titleValue);
    data.set('description', descriptionValue);
    data.set('content', contentValue);
    data.set('image', imageFile);


    const res = await fetch('http://localhost:3000/blogs/create', {
      method: 'POST',
      body: data,
      headers: {
        "Authorization": 'Bearer ' + token,
      }
    })
    if (res.ok) {
      setRedirect(true)
    }
    else {
      alert('Wrong Credentials')
    }
  }

  if (redirect) {
    navigate('/')
  }


  return (
    <>
      <section className="createBlog-section">
        <div className="createBlog-container">
          <h1 className="top">Create Blog</h1>
          <form onSubmit={CreateNewBlog}>
            <div className=" ">
              <p></p>
              <input className="" name='image' type="file" required />
            </div>
            <div className=" ">
              <input className="" name='title' type="text" required placeholder="Title" />
            </div>
            <div className=" ">
              <input className="" name='description' type="text" required placeholder="Descripion" />
            </div>
            <div className=" pass">
              <input className="" name='content' type="text" required placeholder="Cotent" />
            </div>
            <input className="" type="submit" value="Login" />
          </form>
        </div>
      </section>

    </>
  )
}