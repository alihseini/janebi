import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router';
import Layout from '../layout';

const Landing = lazy(() => import('../features/landing'));

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
