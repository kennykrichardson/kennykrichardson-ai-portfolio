import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// The stylesheet is provided by the bundler at runtime.
// @ts-expect-error No CSS module declaration is configured for this project.
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>,
)
