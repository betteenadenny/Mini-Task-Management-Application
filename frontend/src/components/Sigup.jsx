import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Signup() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [errorMessage,setErrorMessage] = useState('');
  const navigate = useNavigate()

  function signupUser(event){
    event.preventDefault();
    const user = {
      name:name,
      email:email,
      password:password,
      confirm_password:confirmPassword
    }
    axios.post(' http://localhost:5000/api/auth/signup',user).then(response => {
      setErrorMessage('');
      navigate('/')
    }).catch(error => {
      if (error.response) {
                const data = error.response.data;
                if (data.message) {
                setErrorMessage(data.message);
                } else if (data.errors) {
                setErrorMessage(data.errors.join(' '));
                } else {
                setErrorMessage('Something went wrong. Please try again.');
                }
            } else {
                setErrorMessage('Unable to connect to the server.');
            }
    })
  }
  return (

    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Task Management icon"
            src="https://e7.pngegg.com/pngimages/549/560/png-clipart-computer-icons-login-scalable-graphics-email-accountability-blue-logo-thumbnail.png"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {errorMessage ?
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{errorMessage}</div>
          :null}
          <form onSubmit={signupUser} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange = {event => setName(event.target.value)}
                  required
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  required
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>  
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  required
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>  
                <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900">
                    Re-type password
                </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={event => setConfirmPassword(event.target.value)}
                  required
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an Account?
            <Link to='/'> Login Here </Link>
          </p>
        </div>
      </div>
    </>
  )
}

