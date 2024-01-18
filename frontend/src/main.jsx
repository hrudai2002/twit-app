import React from 'react';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './screens/index';
import AuthPage from './screens/auth';
import { UserProvider } from './contexts/userContext.jsx';
import PrivateRouter from './private-route/privateRoute';
import { Toaster } from 'react-hot-toast';


const router = createBrowserRouter([
  {
    path: '/', 
    element: <PrivateRouter><App/></PrivateRouter>,
  },
  {
    path: '/auth', 
    element: <AuthPage />
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <UserProvider>
        <RouterProvider router={router} />
        <Toaster />
      </UserProvider>
  </React.StrictMode>
)
