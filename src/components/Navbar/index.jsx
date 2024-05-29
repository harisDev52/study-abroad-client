import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CgProfile } from "react-icons/cg"

const Navbar = () => {
  const navigate = useNavigate()

  // Check if token exists in local storage
  const isLoggedIn = localStorage.getItem('token')

  const handleLogout = async () => {
    try {
      // Hit the logout endpoint
      const response = await fetch('http://127.0.0.1:5000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Send token for authentication
        }
      })

      if (response.ok) {
        // Remove token from localStorage
        localStorage.removeItem('token')

        // Redirect to sign-in page
        navigate('/sign-in')

        // Show success toast message
        toast.success("Logout successful!")
      } else {
        // Handle error response
        console.error('Logout failed')
        // Show error toast message
        toast.error("Logout failed!")
      }
    } catch (error) {
      console.error('Logout error:', error)
      // Show error toast message
      toast.error("Logout error!")
    }
  }

  return (
    <>
      <ToastContainer /> {/* ToastContainer ko add karen */}
      <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-70 z-50">
        <div className="px-5 md:px-10 py-5 xl:container xl:mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <Link to="/home">
            <h1 className="font-bold text-xl sm:text-2xl text-white cursor-pointer font-syne">Ai Study Abroad Assistant</h1>
          </Link>

          <div className="flex items-center gap-5">
            {/* Conditionally render sign-in and sign-up buttons */}
            {!isLoggedIn && (
              <>
                <Link to="/sign-in">
                  <button className="text-sm text-white sm:text-base font-semibold hover:border-b-2 hover:border-gray-600">
                    Sign in
                  </button>
                </Link>
                <Link to="/sign-up">
                  <button className="py-3 btn-blue active:scale-95 hover:opacity-80">
                    Sign up
                  </button>
                </Link>
              </>
            )}

            {/* Conditionally render logout button */}
            {isLoggedIn && (
              <button onClick={handleLogout} className="py-3 btn-blue active:scale-95 hover:opacity-80">
                Logout
              </button>
            )}
            <Link to="/profile">
              <CgProfile className="text-white text-[30px] hover:text-blue-500 hover:scale-110 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </nav>
    </>

  )
}

export default Navbar
