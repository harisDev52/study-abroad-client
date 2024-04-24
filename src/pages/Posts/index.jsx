import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

const Posts = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const domain = queryParams.get("domain");
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/universities/${domain}`);
        setUniversities(response.data.universities);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchUniversities();
  }, [domain]);

  const handleClick = (universityName) => {
    localStorage.setItem("university", universityName);
  };

  return (
    <div className="py-10">
      <h1 className="text-center text-4xl font-bold">Results of {domain} Domain</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          {Array.isArray(universities) && universities.length > 0 ? (
            universities.map((item, index) => (
              <Link key={index} to={`/post-details?domain=${item.domain}`} className="block mb-4" onClick={() => handleClick(item.university)}>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-10 mt-14">
                  <div className="px-8 py-5 rounded shadow-lg bg-white hover:bg-gray-100">
                    <div className="flex items-center gap-3 mt-2">
                      <h1 className="font-bold text-lg">ID:</h1>
                      <p className="text-neutralLight capitalize font-medium">{item.id}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <h1 className="font-bold text-lg">Domain:</h1>
                      <p className="text-neutralLight capitalize font-medium">{item.domain}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <h1 className="font-bold text-lg">Duration:</h1>
                      <p className="text-neutralLight capitalize font-medium">{item.duration} Months</p>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <h1 className="font-bold text-lg">University:</h1>
                      <p className="text-neutralLight capitalize font-medium">{item.university}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <h1 className="font-bold text-lg">CGPA:</h1>
                      <p className="text-neutralLight capitalize font-medium">{item.cgpa}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <h1 className="font-bold text-lg">Independent Scholarship:</h1>
                      <p className="text-neutralLight capitalize font-medium">{item.independent_scholarship}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <h1 className="font-bold text-lg">University Scholarship:</h1>
                      <p className="text-neutralLight capitalize font-medium">{item.university_scholarship}</p>
                    </div>
                  </div>
                  <div>{item.graph}</div>
                </div>
              </Link>
            ))
          ) : (
            <div>No universities found for the given domain</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Posts;
