import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export function EditBlog() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')

  const navigate = useNavigate()

  const { id } = useParams()
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetch('http://localhost:3000/blogs/' + id, {
      headers: {
        "Authorization": 'Bearer ' + token,
      }
    })
      .then(async (e) => {
        const res = await e.json()
        setTitle(res.title)
        setDescription(res.description)
        setContent(res.content)
      })
  }, [])


  async function HandleEdit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const imageFile = data.get('image');

    data.set('title', title);
    data.set('description', description);
    data.set('content', content);
    data.set('image', imageFile);


    const res = await fetch('http://localhost:3000/blogs/' + id, {
      method: 'PUT',
      body: data,
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
      <section className="editBlog-section">
        <div className="editBlog-container">
          <h1 className="top">Edit Blog</h1>
          <form onSubmit={HandleEdit}>
            <div className="">
              <input className="" name='image' type="file" title='choose' />
            </div>
            <div className="">
              <input className="" value={title} name='title' type="text" required onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="">
              <input className="" value={description} name='description' type="text" required onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="">
              <input className="" value={content} name='content' type="text" required onChange={(e) => setContent(e.target.value)} />
            </div>
            <input className="" type="submit" value="Edit" />
          </form>
        </div>
      </section>
    </>
  )
}