import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from './Home';
import axios from 'axios';

export function Signin() {
  const [redirect, setRedirect] = useState(false)

  const navigate = useNavigate()

  async function HandleSignInForm(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get('username');
    const password = data.get('password');

    data.set('username', username);
    data.set('password', password);
    const res = await axios.post(BACKEND_URL + "/api/v1/user/signin", {
      username,
      password,
    })
    if (res.ok) {
      const response = res.data
      localStorage.setItem('token', response.token);
      localStorage.setItem('author', response.username);
      setRedirect(true)
    }
    else {
      alert('Wrong Credentials')
    }
  }




  if (redirect) {
    navigate('/')
  }

  else {
    return (
      <>
        <div class="flex min-h-dvh flex-col justify-center items-center px-6 py-12">
          <div className="mx-auto w-full max-w-sm border-green-600">
            <div className="mx-auto w-full max-w-sm">
              <h2 className=" text-start text-2xl sm:text-3xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 mx-auto w-full max-w-sm">
              <form className="space-y-6" onSubmit={HandleSignInForm}>
                <div>
                  <label for="username" className="block tracking-wide text-sm font-medium leading-6 text-gray-900">Email or Username</label>
                  <div className="mt-2">
                    <input id="username" name="username" type="username" autocomplete="username" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-700 " />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label for="password" className="block tracking-wide text-sm font-medium leading-6 text-gray-900">Password</label>
                  </div>
                  <div className="mt-2">
                    <input id="password" name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <button type="submit" className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">Sign in</button>
                </div>
              </form>

              <p className="mt-10 text-center text-md text-gray-500">
                Not a member?
                <Link to='/signup' className="ml-2 font-semibold tracking-wide text-blue-700 hover:text-blue-600">Sign up</Link>
              </p>
            </div>
          </div>

        </div>

      </>
    )
  }


}