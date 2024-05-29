import { useEffect, useState } from "react"
import axios from "axios"
import { useLocation, Link } from "react-router-dom"
import Navbar from "../../components/Navbar"
import { API_ENDPOINT } from "../../constants"

const Posts = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const domain = queryParams.get("domain")
  const [universities, setUniversities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/get_universities?${queryParams.toString().replace(/\+/g, '%20')}`)
        setUniversities(response.data)
        setLoading(false)
      } catch (error) {
        setError("Error fetching data")
        setLoading(false)
      }
    }

    fetchUniversities()
  }, [domain])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    if (e.target.domain.value) formData.append("domain", e.target.domain.value)
    if (e.target.duration.value) formData.append("duration", e.target.duration.value)
    if (e.target.university.value) formData.append("university", e.target.university.value)
    if (e.target.ielts.value) formData.append("ielts", e.target.ielts.value)
    if (e.target.cgpa.value) formData.append("cgpa", e.target.cgpa.value)
    if (e.target.fees.value) formData.append("fees", e.target.fees.value)
    if (e.target.independent_scholarship.value) formData.append("independent_scholarship", e.target.independent_scholarship.value)
    if (e.target.university_scholarship.value) formData.append("university_scholarship", e.target.university_scholarship.value)

    getUniversities(formData)
  }

  const getUniversities = async (params) => {
    try {
      const query = new URLSearchParams(params)
      const response = await axios.get(`${API_ENDPOINT}/get_universities?${query.toString().replace(/\+/g, '%20')}`)
      setUniversities(response.data)
      setLoading(false)
    } catch (error) {
      setError("Error fetching data")
      setLoading(false)
    }
  }

  const displayYesNo = (value) => {
    return value === "1" ? "Yes" : "No"
  }

  const handleClick = (university) => {
    localStorage.setItem("university", university.university)
    localStorage.setItem("duration", university.duration)
    localStorage.setItem("fees", university.fees)
    localStorage.setItem("ielts", university.ielts)
    localStorage.setItem("cgpa", university.cgpa)
    localStorage.setItem("indpSchlr", university.indpSchlr)
    localStorage.setItem("uniSchlr", university.uniSchlr)
  }

  return (
    <div
      className="flex min-h-screen justify-center bg-cover bg-fixed"
      style={{ backgroundImage: `url('/16603.jpg')` }}
    >
      <Navbar />
      <div className="mt-20 w-1/4 p-4 fixed left-0 h-full overflow-y-auto">
        <div className="p-4 rounded shadow-lg bg-white">
          <h2 className="text-lg font-bold ">Filters</h2>
          <div className="space-y-4">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Domain</label>
                <input
                  type="text"
                  name="domain"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azure focus:border-azure sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration (should be in months)</label>
                <input
                  type="number"
                  step="0.01"
                  name="duration"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azure focus:border-azure sm:text-sm custom-number-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">University</label>
                <input
                  type="text"
                  name="university"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azure focus:border-azure sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">IELTS</label>
                <input
                  type="number"
                  step="0.01"
                  name="ielts"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azure focus:border-azure sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CGPA</label>
                <input
                  type="number"
                  step="0.01"
                  name="cgpa"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azure focus:border-azure sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fees</label>
                <input
                  type="number"
                  step="0.01"
                  name="fees"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azure focus:border-azure sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Independent Scholarship</label>
                <select
                  name="independent_scholarship"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azure focus:border-azure sm:text-sm"
                >
                  <option value="">-- Select --</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">University Scholarship</label>
                <select
                  name="university_scholarship"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azure focus:border-azure sm:text-sm"
                >
                  <option value="">-- Select --</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
              <div className="flex justify-center mt-2">
                <button type="submit" className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="w-3/4 p-4 ml-auto overflow-y-auto h-full mt-20">
        <h1 className="text-center text-4xl font-bold mb-4 bg-white bg-opacity-60 rounded-md">Results of {domain}</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div>
            {Array.isArray(universities) && universities.length > 0 ? (
              universities.map((item, index) => (
                <Link
                  key={index}
                  to={`/post-details?domain=${item.domain}`}
                  className="block rounded-lg overflow-hidden shadow-md hover:shadow-lg mb-4"
                  onClick={() => handleClick(item)}
                >
                  <div className="bg-white bg-opacity-90 p-6">
                    <h2 className="text-xl font-semibold mb-2">{item.university}</h2>
                    <p className="text-gray-700 mb-2">ID: {item.id}</p>
                    <p className="text-gray-700 mb-2">Domain: {item.domain}</p>
                    <p className="text-gray-700 mb-2">Duration: {item.duration} Months</p>
                    <p className="text-gray-700 mb-2">Fees: {item.fees} GBP</p>
                    <p className="text-gray-700 mb-2">Ielts: {item.ielts}</p>
                    <p className="text-gray-700 mb-2">CGPA: {item.cgpa}</p>
                    <p className="text-gray-700 mb-2">Independent Scholarship: {displayYesNo(item.independent_scholarship)}</p>
                    <p className="text-gray-700 mb-2">University Scholarship: {displayYesNo(item.university_scholarship)}</p>
                  </div>
                  <div>{item.graph}</div>
                </Link>
              ))
            ) : (
              <div>No universities found for the given domain</div>
            )}
          </div>
        )}
        {universities.length === 0 && (
          <div className="text-center mt-8 text-gray-700">No universities found for the given domain</div>
        )}
      </div>
    </div>
  )
}

export default Posts
