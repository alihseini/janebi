import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routers/router';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
