import { createBrowserRouter } from 'react-router-dom';
import { ProtectedPath } from '../components/ProtectedPath';
import { Authentication } from '../views/Auth';
import Home from '../views/Home';
import { AppLayout } from '../views/AppLayout';
import Materials from '../views/Materials';
import Blogs from '../views/Blogs';
import Forum from '../views/Forum';
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
