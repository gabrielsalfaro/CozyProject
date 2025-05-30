// frontend/src/App.jsx

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import Home from './components/Home/Home'

function Layout() {
  // const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  // useEffect(() => {
  //   if (isLoaded) {
  //     fetchData().then((data) => {
  //       setData(data);
  //     });
  //   }
  // }, [isLoaded, dispatch]);

  // const fetchData = async () => {
  //   // Try API call 
  //   try {
  //     const response = await fetch('/api/spots'); 
  //     if (response.ok) {
  //       const data = await response.json();
  //       setData(data); // how to send this to Layout?
  //       console.log('>>> ', data)
  //       return data;
  //     } else {
  //       console.error('Error fetching data:', response.status);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <><Home /></>
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;