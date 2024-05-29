import { combineReducers } from 'redux'
import uniReducer from '../UniReducer/uniReducer'

const authInitialState = {
    user: null,
    error: null
  }


  const authReducer = (state = authInitialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return { ...state, user: action.payload, error: null }
      case 'LOGIN_FAILURE':
        return { ...state, error: action.payload, user: null }
      default:
        return state
    }
  }

  const rootReducer = combineReducers({
    auth: authReducer,
    university:uniReducer
  })

  export default rootReducer