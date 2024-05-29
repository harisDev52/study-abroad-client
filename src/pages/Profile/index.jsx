import { useEffect, useState } from "react"
import axios from "axios"
import { useLocation, Link } from "react-router-dom"
import Navbar from "../../components/Navbar"
import { API_ENDPOINT } from "../../constants"


const Profile = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const id = queryParams.get("id")
  const [profile, setprofile] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/user_profile`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        setprofile(response.data)
      } catch (error) {
        console.log(error)
        setError("Error fetching data")
      }
    }
    fetchProfile()
  }, [])

  return (
    <div
      className="flex min-h-screen justify-center bg-cover bg-fixed"
      style={{ backgroundImage: `url('/16603.jpg')` }}
    >
      <Navbar />
      <div className="mt-10 sm:mt-14 lg:mt-28 mb-4">
        <div className="bg-white bg-opacity-90 shadow rounded-lg max-w-4xl mx-auto p-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-syne font-semibold capitalize text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-500">
              Hello, {profile.first_name} {profile.last_name}
            </h1>
            <p className="text-lg sm:text-xl mt-4 text-neutral">
              Welcome to your profile!
            </p>
          </div>
          <div className="mt-10 border-t border-gray-200 pt-10">
            <div className="flex justify-center">
              <img
                className="h-32 w-32 rounded-full object-cover"
                src="https://media.istockphoto.com/id/1196083861/vector/simple-man-head-icon-set.jpg?s=2048x2048&w=is&k=20&c=8jDMHMFOFQpnTLnnLixh8rmIwHeTFegZqS6vaek1MkQ="
                alt="User Avatar"
              />
            </div>
            <div className="text-center mt-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-800">
                {profile.name}
              </h2>
              <p className="text-md sm:text-lg mt-2 text-gray-600">
                {profile.email}
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 shadow rounded-lg">
                <h3 className="text-lg font-medium text-gray-800">Study Programmes</h3>
                <div className="mt-4">
                  <p className="text-gray-600">
                    These suggestions are based on your profile and your behavior on the website. The more we know, the better the suggestions.
                  </p>
                  <p className="mt-4 text-blue-500">
                    <a href="/home">Explore study programmes</a>
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 shadow rounded-lg">
                <h3 className="text-lg font-medium text-gray-800">Scholarships</h3>
                <div className="mt-4">
                  <p className="text-gray-600">
                    Find scholarships tailored to your profile and needs.
                  </p>
                  <p className="mt-4 text-blue-500">
                    <a href="/home">Find scholarships</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
