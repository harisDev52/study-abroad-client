import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import LoadingSpinner from "../../components/LoadingSpinner"
import { login } from "../../redux/action/authAction/authAction"
import Navbar from "../../components/Navbar"

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const success = await dispatch(login(email, password, redirectToHome)) // Pass selectedBusinessUnit to login function
      if (success) {
        setEmail("")
        setPassword("")
      }
    } catch (error) {
      toast.error(error.message || "Login Failed !")
    }
  }

  const redirectToHome = () => {
    window.location.href = '/home'
  }

  return (
    <div
      className="flex min-h-screen justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/widener.jpg')` }}
    >
      <Navbar />
      <div className=" justify-center pt-16 mt-20">
        <div className="mx-auto w-full sm:max-w-sm lg:w-96 bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
          <div>
            <h2 className="mt-6 text-xl sm:text-3xl font-bold leading-9 tracking-tight text-blackLight">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="font-semibold text-indigo-600 hover:text-indigo-500 !underline"
              >
                Sign Up
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className={`space-y-6 mt-8`}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 px-2 py-2 shadow-sm focus:ring-2 focus:ring-azure focus:outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 px-2 py-2 shadow-sm focus:ring-2 focus:ring-azure focus:outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-azure px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-opacity-85"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
