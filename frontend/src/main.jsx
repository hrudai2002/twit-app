import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './screens/index';
import NavBar from "./components/Navbar";
import Messages from "./components/Messages"
import Bookmarks from "./components/Bookmarks"
import AuthPage from './screens/auth';
import store from './redux/store.ts';
import PrivateRouter from './private-route/privateRoute';
import { login } from './redux/slices/userSlice.ts';
import  { Provider, useDispatch } from 'react-redux';
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
      },
      {
        path: "bookmarks", 
        element: <PrivateRouter><Bookmarks/></PrivateRouter>
      }
    ]
  },
  {
    path: '/auth', 
    element: <AuthPage />
  }
]);

const Main = () => {
  const dispatch = useDispatch(); 
  useEffect(() => {
    const storedUser = localStorage.getItem('user'); 
    if(storedUser) {
      dispatch(login(JSON.parse(storedUser)));
    }
  }, [dispatch]);
  return <RouterProvider router={router} />
}



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <Main />
        <Toaster />
      </Provider>
  </React.StrictMode>
)
