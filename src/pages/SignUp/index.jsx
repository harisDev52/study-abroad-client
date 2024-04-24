import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * To disappear the error msg after 5 seconds
   */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAlertMsg("");
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [alertMsg]);

  /**
   *  Handles the form submission event (Signing up functionality).
   */
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // const userData = {
    //   firstName,
    //   lastName,
    //   email,
    //   password,
    // };
    try {
      setLoading(true);

      if (!(password === confirmPassword))
        return setAlertMsg("Passwords doesn't match");

      // const { data } = await axios.post("", userData);
    } catch (error) {
      console.log("Failed to sign up the user: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-1 justify-center">
      <div className="flex justify-center px-4 py-12 sm:px-6 lg:flex-none">
        <div className="mx-auto w-full sm:max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-xl sm:text-3xl font-bold leading-9 tracking-tight text-blackLight">
              Create your account
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="font-semibold text-indigo-600 hover:text-indigo-500 !underline"
              >
                Sign In
              </Link>
            </p>
          </div>
          {alertMsg && (
            <p className="inline-block bg-red-500 rounded px-5 py-3 mt-5 text-white text-sm">
              {alertMsg}
            </p>
          )}
          <form
            onSubmit={onSubmitHandler}
            className={`space-y-6 ${alertMsg ? "mt-5" : "mt-8"}`}
          >
            {/* -------First and Last Name-------- */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="fname"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    id="fname"
                    name="first name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 px-2 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blackLight placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lname"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="lname"
                    name="last name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 px-2 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blackLight placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            {/*  -----------Email Address---------- */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email Address
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
                  className="block w-full rounded-md border-0 px-2 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blackLight sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/*  -----------Password---------- */}
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
                  className="block w-full rounded-md border-0 px-2 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blackLight placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/*  -----------Confirm Password---------- */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 px-2 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blackLight placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-azure px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-opacity-85"
            >
              {loading ? <LoadingSpinner /> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
