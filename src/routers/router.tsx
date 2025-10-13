import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import Layout from '../layout';

const Landing = lazy(() => import('../features/landing/index'));
const Products = lazy(() => import('../features/products/index'));
const ProductDetails = lazy(() => import('../features/products/page/ProductDetails'));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'landing', element: <Landing /> },
      { path: 'products', element: <Products /> },
      {
        path: 'products/:id',
        element: <ProductDetails />,
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
