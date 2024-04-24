import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Details = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const domain = queryParams.get("domain");
  const [description, setDescription] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve university from localStorage
    const university = localStorage.getItem("university");

    const fetchDescription = async () => {
      try {
        const descriptionResponse = await axios.get(`http://127.0.0.1:5000/description/${domain}`);
        setDescription(descriptionResponse.data.description);
      } catch (error) {
        setError("Error fetching description");
      }
    };

    const fetchReviews = async () => {
      try {
        const reviewsResponse = await axios.get(`http://127.0.0.1:5000/reviews/${university}`);
        setReviews(reviewsResponse.data.reviews);
      } catch (error) {
        setError("Error fetching reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchDescription();
    fetchReviews();
  }, [domain]);

  // Settings for react-slick slider
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-center text-2xl md:text-4xl font-bold capitalize mb-8">
        Detail info of {domain}
      </h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <div className="p-5 bg-white shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-lg text-neutralLight">{description}</p>
          </div>
          <div className="p-5 bg-white shadow-md">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            <Slider {...sliderSettings}>
              {reviews.map((review, index) => (
                <div key={index} className="border border-gray-200 rounded p-4 mt-4">
                  <p className="text-lg mb-2">{review.review}</p>
                  <p className="text-sm text-gray-500">Rating: {review.rating}</p>
                </div>
              ))}
            </Slider>
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
