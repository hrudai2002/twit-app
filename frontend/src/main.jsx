import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './screens/index';
import NavBar from "./components/Navbar";
import Messages from "./components/Messages"
import AuthPage from './screens/auth';
import { UserProvider } from './contexts/userContext.jsx';
import PrivateRouter from './private-route/privateRoute';
import { Toaster } from 'react-hot-toast';
import './App.scss';


const router = createBrowserRouter([
  {
    path: "/", 
    element: <PrivateRouter><NavBar/></PrivateRouter>,
    children: [
      {
        path: "home", 
        element: <PrivateRouter><App/></PrivateRouter>
      },
      {
        path: "chats", 
        element: <PrivateRouter><Messages/></PrivateRouter>
      }
    ]
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
