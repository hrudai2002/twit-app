import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createContext } from 'react'

const userContext = createContext();

const [user, setUser] = useState(null);


ReactDOM.createRoot(document.getElementById('root')).render(
  <userContext.Provider value={{ user, setUser }}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </userContext.Provider>
)
