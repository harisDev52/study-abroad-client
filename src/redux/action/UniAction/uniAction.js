import axios from 'axios';
import { toast } from 'react-toastify';

const API_ENDPOINT = 'http://127.0.0.1:5000/';

  export const fetchUniversityById = (domain) => async dispatch => {
    try {
      const UniResponse = await axios.post(`${API_ENDPOINT}universities/${domain}`);
      dispatch({ type: 'GET_UNIVERSITY_SUCCESS', payload: UniResponse.data.universities });
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Failed to fetch Universities';
      dispatch({ type: 'GET_UNIVERSITY_FAILURE', payload: errorMessage });
      toast.error(errorMessage);
    }
  };