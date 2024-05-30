import axios from 'axios'
import { toast } from 'react-toastify'
import { API_ENDPOINT } from '../../../constants'



export const login = (email, password, onSuccess) => async (dispatch) => {
  try {
    if (!password) return alert("Please enter your password")

    const loginResponse = await axios.post(
      `${API_ENDPOINT}/login`,
      { email, password }
    )

    if (loginResponse.data) {

      console.log(loginResponse.data.token)

      localStorage.setItem('token', loginResponse.data.access_token)
      dispatch({ type: "LOGIN_SUCCESS", payload: loginResponse.data })
      onSuccess() // Invoke the onSuccess callback to trigger redirection
      toast.success("Login successful!")

      return true
    } else {
      throw new Error("Login failed")
    }
  } catch (error) {
    console.log(error, "er------------------------")
    const errorMessage = error.response ? error.response.data.message : 'Login Failed'
    dispatch({ type: "LOGIN_FAILURE", payload: errorMessage })
    toast.error(errorMessage)
    return false
  }
}
