import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const customToastStyle = {
  fontFamily: 'Public Sans, sans-serif', // Font family ko customize karen
}

import { Provider as ReduxProvider } from 'react-redux'
import { store } from './redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer style={customToastStyle} />
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
)
