import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

// load third party styles
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

//load application
import App from './App'

// this is an entry point to the application

// render to the DOM
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
