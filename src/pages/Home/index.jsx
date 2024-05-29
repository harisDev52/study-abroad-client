import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { GoArrowRight } from "react-icons/go"
import Navbar from "../../components/Navbar"

const Home = () => {
  const navigate = useNavigate()
  const [domain, setDomain] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch("http://127.0.0.1:5000/get_suggestions")
        const data = await response.json()
        setSuggestions(data)
      } catch (err) {
        setError("Failed to load suggestions")
      } finally {
        setLoading(false)
      }
    }

    fetchSuggestions()
  }, [])

  const handleChange = (e) => {
    const userInput = e.target.value
    setDomain(userInput)

    const filtered = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    )
    setFilteredSuggestions(filtered)
    setShowSuggestions(true)
  }

  const handleSuggestionClick = (suggestion) => {
    setDomain(suggestion)
    setFilteredSuggestions([])
    setShowSuggestions(false)
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    const capitalizedDomain = domain
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    navigate(`/posts?domain=${encodeURIComponent(capitalizedDomain)}`)
  }

  return (
    <div
      className="flex min-h-screen justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/16603.jpg')` }}
    >
      <Navbar />
      <div className="justify-center pt-16 mt-20">
        <div className="mx-auto bg-white bg-opacity-90 p-8 rounded-lg shadow-lg mb-4">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl text-center font-syne font-semibold capitalize text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-500">
            Navigate your educational journey <br className="hidden lg:block" />{" "}
            with ease!
          </h1>
          <h1 className="text-lg sm:text-2xl lg:text-3xl text-center mt-10 sm:mt-20 lg:mt-28 capitalize font-medium text-neutral">
            Enter your domain of interest below
          </h1>
          <form
            onSubmit={submitHandler}
            className="mt-10 sm:mt-14 lg:mt-16 md:flex items-start gap-4 max-w-3xl mx-auto"
          >
            <div className="relative w-full bg-black bg-opacity-90 rounded-md p-1">
              <input
                type="text"
                required
                value={domain}
                placeholder="Enter any domain name"
                className="w-full py-3 px-4 focus:outline-none"
                onChange={handleChange}
                onBlur={() => {
                  setTimeout(() => setShowSuggestions(false), 100)
                }}
                onFocus={() => setShowSuggestions(true)}
              />
              {showSuggestions && filteredSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto">
                  {filteredSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onMouseDown={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button className="flex items-center justify-center gap-2 mt-3 md:mt-0 md:gap-1 py-3 w-full md:w-[180px] btn-blue active:scale-95 hover:opacity-80">
              Search <GoArrowRight fontSize={20} />
            </button>
          </form>
          {loading && <p className="text-center mt-4">Loading suggestions...</p>}
          {error && <p className="text-center mt-4 text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default Home
