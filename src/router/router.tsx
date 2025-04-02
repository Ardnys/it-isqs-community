import { createBrowserRouter } from 'react-router-dom';
import { ProtectedPath } from '../components/ProtectedPath';
import { Authentication } from '../views/Auth';
import Home from '../views/Main/Home';
import { AppLayout } from '../views/Main/AppLayout';
import Materials from '../views/Main/Materials';
import Blogs from '../views/Main/Blogs';
import Forum from '../views/Main/Forum';
import SignUp from '../views/Main/SignUp';

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
