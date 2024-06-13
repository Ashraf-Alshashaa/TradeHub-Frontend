import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Test = lazy(() => import('./pages/Test'));
const Home = lazy(() => import('./pages/Home'));

const routes: RouteObject[] = [
    {
    path: '/',
    element: <Home />,
  },
  {
    path: '/test',
    element: <Test />,
  },
];

export default routes;