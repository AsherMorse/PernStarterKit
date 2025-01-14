/**
 * main.jsx - React Application Entry Point
 * 
 * This is the main entry point for the React application.
 * It sets up the root React component and applies StrictMode for development checks.
 * 
 * @module main
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Create and render the root React component
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
) 