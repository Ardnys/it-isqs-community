import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../views/AppLayout';
import { Authentication } from '../views/Auth';
import Blogs from '../views/Blogs';
import Forum from '../views/Forum';
import Home from '../views/Home';
import Materials from '../views/Materials';
import SignUp from '../views/SignUp';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/materials',
        element: <Materials />,
      },
      {
        path: '/blogs',
        element: <Blogs />,
      },
      {
        path: '/forum',
        element: <Forum />,
      },
    ],
  },

  {
    path: '/auth',
    element: <Authentication />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);
