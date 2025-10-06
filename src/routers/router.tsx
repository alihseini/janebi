import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router';
import Layout from '../layout/Layout';

const Landing = lazy(() => import('../features/landing/Landing'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="landing" element={<Landing />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  )
);
