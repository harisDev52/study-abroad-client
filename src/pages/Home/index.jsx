import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

const Home = () => {
  const navigate = useNavigate();
  const [domain, setDomain] = useState("");

  /**
   * This function is used to handle the click event of Search Button
   */
  const submitHandler = async (e) => {
    e.preventDefault();
  
    navigate(`/posts?domain=${encodeURIComponent(domain)}`);
    
  };

  return (
    <div className="mt-10 sm:mt-14 lg:mt-20">
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
        <div className="w-full">
          <input
            type="text"
            required
            value={domain}
            placeholder="Enter any domain name"
            className="border border-[#DBDFE5] rounded py-3 px-4 w-full focus:outline-azure"
            onChange={(e) => setDomain(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-2 mt-3 md:mt-0 md:gap-1 py-3 w-full md:w-[180px] btn-blue active:scale-95 hover:opacity-80">
          Search <GoArrowRight fontSize={20} />
        </button>
      </form>
    </div>
  );
};

export default Home;
