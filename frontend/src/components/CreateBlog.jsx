import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Editor } from './Editor'
import 'react-quill/dist/quill.snow.css';

export function CreateBlog() {

  const [redirect, setRedirect] = useState(false);
  const [content, setContent] = useState('')

  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  async function CreateNewBlog(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const titleValue = data.get('title');
    const descriptionValue = data.get('description');
    const imageFile = data.get('image');

    data.set('title', titleValue);
    data.set('description', descriptionValue);
    data.set('content', content);
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

      <div className="container mx-auto px-4 py-4 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto w-full">
          <div className="">
            <form className="grid grid-cols-2 md:gap-x-12 lg:gap-x-16 xl:gap-x-20 gap-y-4 md:gap-y-6 auto-rows-max px-4 " onSubmit={CreateNewBlog}>



              <div className='col-span-2 md:col-span-1'>
                <label htmlFor="title" className="block tracking-wider text-sm sm:text-md md:text-lg font-medium leading-3 text-gray-900">Title</label>
                <div className="mt-2 md:mt-3">
                  <input id="title" name="title" type="text" required className="block sm:h-10 text-md w-full px-4 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400   focus:ring-1 focus:ring-inset focus:ring-blue-700 " />
                </div>
              </div>

              <div className='col-span-2 md:col-span-1'>
                <label htmlFor="description" className="block tracking-wider text-sm sm:text-md md:text-lg font-medium leading-3 text-gray-900">Description</label>
                <div className="mt-2 md:mt-3">
                  <input id="description" name="description" type="text" required className="block text-md px-4 sm:h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400  focus:ring-1 focus:ring-inset focus:ring-blue-700 " />
                </div>
              </div>


              <div className='col-span-2'>
                <input id="imageFile" name='image' type="file" required className="block w-full ring-1 ring-gray-400 rounded-md text-sm md:text-md text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-md file:font-semibold
                  file:bg-violet-100 file:text-blue-700
                  hover:file:bg-violet-200
                "/>
              </div>

              <Editor value={content} onChange={setContent} required />


              <div className='col-span-2 place-self-end'>
                <button type="submit" className="flex rounded-md bg-blue-700 px-4 py-2 text-md font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">Create Blog</button>
              </div>
            </form>
          </div>
        </div>

      </div>





    </>
  )
}