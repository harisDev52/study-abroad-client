import { Link } from "react-router-dom";

const Navbar = () => {
  // Check if token exists in local storage
  const isLoggedIn = localStorage.getItem('token');

  return (
    <nav className="border-b border-gray-200">
      <div className="px-5 md:px-10 py-5 xl:container xl:mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <Link to="/">
          <h1 className="font-bold text-xl sm:text-2xl text-azure cursor-pointer font-syne">Ai Study Abroad Assistant</h1>
        </Link>

        <div className="flex items-center gap-5">
          {/* Conditionally render sign-in and sign-up buttons */}
          {!isLoggedIn && (
            <>
              <Link to="/sign-in">
                <button className="text-sm sm:text-base font-semibold hover:border-b-2 hover:border-gray-600">
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
            <Link>
            <button className="py-3 btn-blue active:scale-95 hover:opacity-80">
              Logout
            </button>
           </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
