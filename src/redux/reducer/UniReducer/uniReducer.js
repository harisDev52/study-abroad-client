const uniInitialState = {
    universities: null,
    error: null
  }

  const uniReducer = (state = uniInitialState, action) => {
    switch (action.type) {
      case 'GET_UNIVERSITY_SUCCESS':
        return { ...state, universities: action.payload, error: null }
      case 'GET_UNIVERSITY_FAILURE':
        return { ...state, error: action.payload, universities: null }
      default:
        return state
    }
  }

  export default uniReducer